import classes from "./Broadcast.module.scss";
import React from "react";
import { Button } from "../../../components/UI/Button/Button";


const VIEWER_SERVER = "ws://ec2-54-144-255-19.compute-1.amazonaws.com:8079";
const STREAMER_SERVER ="ws://ec2-54-144-255-19.compute-1.amazonaws.com:8080";

class Broadcast extends React.Component {
  constructor() {
    super();
    this.getMedia = this.getMedia.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.viewer_socket = null;
    this.streamer_socket = null;
    this.video = null;
    this.takenVideo = null;
    this.mediaRecorder = null;
    this.state = {
      isLive: false,
    };
  }

  onStartClick = () => {
    this.mediaRecorder.start(1000);
    console.log("recorder started");
    this.setState({
      isLive: true,
    });
  };

  onStopClick = () => {
    try {
      this.mediaRecorder.stop();
    } catch (err) {
      console.log("Inactive state: ", err);
    }
    console.log("recorder stopped");
    this.setState({
      isLive: false,
    });
  };

  async getMedia(constraints) {
    let stream = null;
    try {
      //Получаем поток с камеры/микрофона
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = stream;
      let recorderOptions = {
        mimeType: "video/webm; codecs=vp8", // будем кодировать видеопоток в формат webm кодеком h264/vp8
      };

      this.mediaRecorder = new MediaRecorder(stream, recorderOptions);
      this.streamer_socket = new WebSocket(STREAMER_SERVER);
      this.mediaRecorder.ondataavailable = (e) => {
        this.streamer_socket.send(e.data);
      };
    } catch (err) {
      console.log("Problems with devices: ", err);
    }
  }

  getVideo() {

    this.viewer_socket = new WebSocket(VIEWER_SERVER);

    let mediaSource = new MediaSource();
    let arrayOfBlobs = [];
    let sourceBuffer = null;

    //Создание буфера с видео
    mediaSource.addEventListener("sourceopen", function () {
      sourceBuffer = mediaSource.addSourceBuffer("video/webm; codecs=vp8");
      sourceBuffer.addEventListener("updateend", appendToSourceBuffer);
    });

    this.takenVideo.src = URL.createObjectURL(mediaSource);

    //Слушатель сообщения от сокета
    this.viewer_socket.addEventListener("message", (event) => {
      arrayOfBlobs.push(event.data);
      appendToSourceBuffer();
    });

    const appendToSourceBuffer = async () => {
      if (
        mediaSource.readyState === "open" &&
        sourceBuffer &&
        sourceBuffer.updating === false
      ) {
        //console.log(arrayOfBlobs[0]);
        if(arrayOfBlobs.length > 0) {
          let buffer = await arrayOfBlobs.shift().arrayBuffer();
          await sourceBuffer.appendBuffer(buffer);
        }
      }

      if (
        this.takenVideo.buffered.length &&
        this.takenVideo.buffered.end(0) - this.takenVideo.buffered.start(0) > 1200
      ) {
        sourceBuffer.remove(0, this.takenVideo.buffered.end(0) - 1200);
      }
    }
  }

  componentDidMount() {
    this.video = document.getElementsByClassName(
      classes.Broadcast__Stream__Video
    )[0];
    this.takenVideo = document.getElementsByClassName(
      classes.Broadcast__Stream__GetVideo
    )[0];
    const constraints = {
      video: {
        width: { min: 320, ideal: 1280, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 },
      },
    };
    this.getMedia(constraints);
    this.getVideo();
  }

  componentWillUnmount() {
    if (this.state.isLive) {
      try {
        this.mediaRecorder.stop();
      } catch (err) {
        console.log(err);
      }
    }
    if (!this.state.isLive && this.video.srcObject) {
      let tracks = this.video.srcObject.getTracks();
      if (tracks.length > 0) {
        tracks[0].stop();
      }
    }
  }

  render() {
    return (
      <div className={classes.Broadcast}>
        <div className={classes.Broadcast__Stream}>
          <video className={classes.Broadcast__Stream__Video} autoPlay></video>
          <div className={classes.Broadcast__Buttons}>
            <Button onClick={this.onStartClick} type="success" disabled = {this.state.isLive}>
              Start
            </Button>
            <Button
              onClick={this.onStopClick}
              type="error"
              disabled={!this.state.isLive}
            >
              Stop
            </Button>
          </div>
          <video
            className={classes.Broadcast__Stream__GetVideo}
            autoPlay
            controls
          ></video>
        </div>
      </div>
    );
  }
}

export default Broadcast;

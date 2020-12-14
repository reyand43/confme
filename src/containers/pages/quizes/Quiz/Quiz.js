import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import { BGMain } from "../../../../components/UI/BGMain/BGMain";
import { BGSide } from "../../../../components/UI/BGSide/BGSide";
import axios from './../../../../axios/axios'
import { Loader } from "../../../../components/UI/Loader/Loader";
import ActiveQuiz from '../../../../components/UI/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../../../components/UI/FinishedQuiz/FinishedQuiz'
import { connect } from "react-redux";
import { selectQuiz } from "../../../../store/actions/quiz"

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    try {
      // if (this.props.match.params.id.length < 7) { //если это опрос спонсоров (там id - число 0-1000000), то лоадим из surveys
      //   this.setState({
      //     quiz: this.props.surveys,
      //     loading: false
      //   })
      // } else { //если это опрос, созданный вручную - загружаем из quizes
        const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
        const quiz = response.data
        this.setState({
          quiz,
          loading: false
        })
      //}
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.loading
             ? <Loader />
             : this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
              /*this.state.loading
               ? <Loader />
               : this.state.isFinished
                ? <FinishedQuiz
                  results={this.props.survey.results}
                  quiz={this.props.survey.quiz}
                  onRetry={this.retryHandler}
                />
                : <ActiveQuiz
                  answers={this.props.survey.quiz[this.props.survey.activeQuestion].answers}
                  question={this.props.survey.quiz[this.props.survey.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.props.survey.quiz.length}
                  answerNumber={this.props.survey.activeQuestion + 1}
                  state={this.props.survey.answerState}
                />*/

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    surveys: state.surveys.surveys
  }
}


export default connect(mapStateToProps)(Quiz)

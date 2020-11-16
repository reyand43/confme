export default class App extends Component {
  constructor(props) {
    super(props);
    // Устанавливаем состояние
    this.state = {
      data: null,
      active: 0,
      term: "",
    };
    // Сразу загружаем данные
    this.loadData();
  }

  loadData() {
    load(this.props.data).then((users) => {
      this.setState({
        data: JSON.parse(users),
      });
    });
  }

  updateData(config) {
    this.setState(config);
  }

  render() {
    return (
      <div className="app container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Searchbar
              term={this.state.term}
              data={this.initialData}
              update={this.updateData.bind(this)}
            />
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Toolbar
                initialData={this.initialData}
                data={this.state.data}
                update={this.updateData.bind(this)}
              />
            </div>
          </div>
          <div className="col-sm-4 col-md-3 col-lg-2">
            <ActiveUser data={this.state.data} active={this.state.active} />
          </div>
          <div className="col-sm-8 col-md-9 col-lg-10">
            <UserList
              data={this.state.data}
              update={this.updateData.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

///UserData
import React from "react";

export default ({ user, update, index }) => {
  return (
    <tr onClick={() => update({ active: index })}>
      <td>
        <img src={`images/${user.image}.svg`} className="user-image" />
      </td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>8 {user.phone}</td>
    </tr>
  );
};

//UserList
import React from "react";
import UserData from "./UserData";

export default ({ data, update }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  const users = data.map((user, index) => {
    return (
      <UserData
        user={user}
        index={index}
        key={`user-${index}`}
        update={update}
      />
    );
  });

  return (
    <table className="user-list table table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>{users}</tbody>
    </table>
  );
};

//active user
import React from "react";

export default ({ data, active }) => {
  if (!data || !data[active]) {
    return <h3>Nothing found :(</h3>;
  }

  const user = data[active];

  return (
    <div className="thumbnail">
      <img src={`images/${user.image}.svg`} />

      <div className="thumbnail-caption">
        <h3>{user.name}</h3>
        <table className="user-info table table-responsive">
          <tbody>
            <tr>
              <td>Age:</td>
              <td>{user.age}</td>
            </tr>
            <tr>
              <td>Favorite animal:</td>
              <td>{user.image}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>8 {user.phone}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Favorite phrase:</b> {user.phrase}
        </p>
      </div>
    </div>
  );
};

//search bar
import React from "react";

export default ({ term, data, update }) => {
  const dataSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filter = data.filter((user) => {
      return user.name.toLowerCase().includes(value);
    });

    update({
      data: filter,
      active: 0,
      term: value,
    });
  };

  return (
    <div className="searchbar form-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Search people by name..."
        onChange={dataSearch}
      />
    </div>
  );
};

//toolbar
import React, { Component } from "react";
export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.sorted = { age: true, name: true };
  }

  sort(type) {
    // с помощью реструктуризации создаём две переменные
    const { update, data } = this.props;
    // получаем порядок сортировки
    const isSorted = this.sorted[type];
    // устанавливаем направление
    let direction = isSorted ? 1 : -1;

    // создаём новый массив из данных, чтобы не перезаписывать
    // состояние и сортируем его
    const sorted = [].slice.call(data).sort((a, b) => {
      // чтобы сортировка всегда была одинаковой учтём все условия
      // функция может вернуть 0, 1 или -1, в зависимости от возвращаемого
      // значения метод массивов sort сделает свой выбор
      if (a[type] === b[type]) {
        return 0;
      }
      return a[type] > b[type] ? direction : direction * -1;
    });

    // меняем порядок сортировки
    this.sorted[type] = !isSorted;

    // обновляем состояние
    update({
      data: sorted,
      active: 0,
    });
  }
  reset() {
    this.props.update({
      data: this.props.initialData,
      term: "",
      active: 0,
    });
  }

  render() {
    return (
      <div className="toolbar">
        <button className="btn btn-default" onClick={() => this.sort("name")}>
          <i className="fa fa-sort-alpha-asc"></i> Sort by name
        </button>
        <button className="btn btn-default" onClick={() => this.sort("age")}>
          <i className="fa fa-sort-numeric-desc"></i> Sort by age
        </button>
        <button className="btn btn-danger" onClick={this.reset.bind(this)}>
          <i className="fa fa-ban"></i> Reset
        </button>
      </div>
    );
  }
}

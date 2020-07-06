import React, { Component } from 'react';

function TotoItem(props) {
  return (
    <div className={props.isCompleted ? 'TodoItem TodoItem-completed' : 'TodoItem'} onClick={props.action}>
      {props.label}
    </div>
  );
}
export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.btnAddItem = React.createRef();
    this.inputAddItem = React.createRef();

    this.state = {
      items: [
        { title: 'Coding', isCompleted: true },
        { title: 'Reading book', isCompleted: false },
        { title: 'Exercise', isCompleted: false },
      ],
      openModal: false,
      inputWarning: false,
    };
  }

  openModal = () => {
    if (!this.state.openModal) {
      this.setState({
        openModal: true,
      });
    } else {
      this.setState({
        openModal: false,
      });
    }
  };

  ToggleComplete = (item) => {
    const { items } = this.state;
    const isCompleted = item.isCompleted;
    const index = items.indexOf(item);
    return () => {
      this.setState({
        items: [
          ...items.slice(0, index),
          {
            ...item,
            isCompleted: !isCompleted,
          },
          ...items.slice(index + 1),
        ]
      });
    };
  };

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
      inputAddItem: false
    })
  };

  addNewItem = (e) => {
    const { items } = this.state;
    const value = this.inputAddItem.current.value;
    this.inputAddItem.current.focus();
    if (value.length) {
      this.setState({
        items: [
          ...items,
          {
            title: value,
            isCompleted: false,
          },
        ],
        inputWarning: false,
      });
    } else {
      this.setState({
        inputWarning: true
      });
    }
    
  };

  render() {
    const { openModal, items, inputWarning } = this.state;
    return (
      <div className="TodoApp">
        <header>DAILIST</header>
        {items.length > 0 && (
          <main>
            <div className="TodoApp-List TodoApp-UpComming">
              <h3>Upcoming</h3>
              <div className="TodoApp-ListItems">
                {items
                  .filter((item) => item.isCompleted === false)
                  .map((item, index) => {
                    return <TotoItem action={this.ToggleComplete(item)} key={index} label={item.title} isCompleted={item.isCompleted}></TotoItem>;
                  })}
              </div>
            </div>
            <div className="TodoApp-List TodoApp-Finished">
              <h3>Finished</h3>
              <div className="TodoApp-ListItem">
                {items
                  .filter((item) => item.isCompleted === true)
                  .map((item, index) => {
                    return <TotoItem action={this.ToggleComplete(item)} key={index} label={item.title} isCompleted={item.isCompleted} />;
                  })}
              </div>
            </div>
          </main>
        )}
        {items.length === 0 && <main>Seems like You have no list..</main>}
        <footer>
          <button className="TodoApp-AddBtn" onClick={this.openModal}>
            +
          </button>
        </footer>
        {openModal && (
          <div className="Modal-wrapper">
            <div className="Modal">
              <button onClick={this.openModal} className="btn-close">
                ×
              </button>
              <div className="Modal-content">
                <input ref={this.inputAddItem} type="text" placeholder="Add a new item" onKeyUp={this.handleInput} />
                {inputWarning && <em>This field is required</em>}
              </div>
              <div className="Modal-footer">
                <button ref={this.btnAddItem} onClick={this.addNewItem} className="btn btn-green">
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Requirements:
// Viết một app todo-list có giao diện như hình https://cdn.glitch.com/780fd861-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Không cần phải giống 100%, nhưng càng giống càng tốt và phải có tính thẩm mỹ
// Illustration có thể tải ở đây https://undraw.co/illustrations hoặc các nguồn khác và upload lên Glitch assets
// Cần làm:
// - Màn hình danh sách todo list, nếu trống thì hiển thị một hình nào đó như trong ảnh
// - Khi ấn nút + để tạo todo mới thì hiển thị modal có chứa 1 text input và nút để add
// - Khi ấn vào 1 item thì sẽ toggle trạng thái isDone của nó
// - Nếu isDone là true thì cho vào danh sách Finished, còn không thì ở Upcoming

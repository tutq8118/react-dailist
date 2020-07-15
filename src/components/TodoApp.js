import React, { Component } from 'react';
import noItemSVG from './../no-item.svg';

function TotoItem(props) {
  return (
    <div title={props.isCompleted ? 'Unfinish item' : 'Finish item'} className={props.isCompleted ? 'TodoItem TodoItem-completed' : 'TodoItem'} onClick={props.action}>
      <span>{props.label}</span>
      <button className="btn-close" title="Remove item" onClick={props.removeItem}>
        ×
      </button>
    </div>
  );
}
export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.btnAddItem = React.createRef();
    this.inputAddItem = React.createRef();

    const localItems = localStorage.getItem('todoItems') ? localStorage.getItem('todoItems') : [];

    this.state = {
      items: JSON.parse(localItems),
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

  handleRemoveItem = (item) => {
    const { items } = this.state;
    const index = items.indexOf(item);
    
    return (e) => {
      e.stopPropagation();
      console.log("removed");
      this.setState({
        items: [
          ...items.slice(0, index),
          ...items.slice(index + 1),
        ],
      });
      const newItems = [
        ...items.slice(0, index),
        ...items.slice(index + 1),
      ];
      localStorage.setItem('todoItems', JSON.stringify(newItems));
    }
  }

  ToggleComplete = (item) => {
    const { items } = this.state;
    const isCompleted = item.isCompleted;
    const index = items.indexOf(item);
    
    return () => {
      console.log("completed");
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
      const newItems = [
        ...items.slice(0, index),
        {
          ...item,
          isCompleted: !isCompleted,
        },
        ...items.slice(index + 1),
      ];
      localStorage.setItem('todoItems', JSON.stringify(newItems));
    };
  };

  handleKeyDown = (e) => {
    const { items } = this.state;
    const value = this.inputAddItem.current.value;
    if (e.key === 'Enter') {
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
        const newItems = [
          ...items,
          {
            title: value,
            isCompleted: false,
          },
        ];
        localStorage.setItem('todoItems', JSON.stringify(newItems));
        this.inputAddItem.current.value = '';
      } else {
        this.setState({
          inputWarning: true
        });
      }
    }
  };

  handleBlur = (e) => {
      this.setState({
        inputWarning: false
      });
  }

  handAddNewItem = (e) => {
    const { items } = this.state;
    const value = this.inputAddItem.current.value;
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
      const newItems = [
        ...items,
        {
          title: value,
          isCompleted: false,
        },
      ];
      localStorage.setItem('todoItems', JSON.stringify(newItems));
      this.inputAddItem.current.focus();
      this.inputAddItem.current.value = '';
    } else {
      this.inputAddItem.current.focus();
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
                {items.filter((item) => item.isCompleted === false).length > 0 &&
                  items
                    .filter((item) => item.isCompleted === false)
                    .map((item, index) => {
                      return <TotoItem action={this.ToggleComplete(item)} removeItem={this.handleRemoveItem(item)} key={index} label={item.title} isCompleted={item.isCompleted}></TotoItem>;
                    })}
                {items.filter((item) => item.isCompleted === false).length === 0 && <p className="TodoApp-noItem">No item...</p>}
              </div>
            </div>
            <div className="TodoApp-List TodoApp-Finished">
              <h3>Finished</h3>
              <div className="TodoApp-ListItem">
                {items.filter((item) => item.isCompleted === true).length > 0 &&
                  items
                    .filter((item) => item.isCompleted === true)
                    .map((item, index) => {
                      return <TotoItem action={this.ToggleComplete(item)} removeItem={this.handleRemoveItem(item)} key={index} label={item.title} isCompleted={item.isCompleted} />;
                    })}
                {items.filter((item) => item.isCompleted === true).length === 0 && <p className="TodoApp-noItem">No item...</p>}
              </div>
            </div>
          </main>
        )}
        {items.length === 0 && (
          <main className="noItem">
            <figure onClick={this.openModal}>
              <img src={noItemSVG} alt="" />
            </figure>
            <p>
              Seems like You have no list. <br />
              Just try to create some...
            </p>
          </main>
        )}
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
                <input ref={this.inputAddItem} type="text" placeholder="Add a new item" onKeyDown={this.handleKeyDown} onBlur={this.handleBlur} autoFocus={true} />
                {inputWarning && (
                  <em className="form-error">
                    <small>Please type something...</small>
                  </em>
                )}
              </div>
              <div className="Modal-footer">
                <button ref={this.btnAddItem} onClick={this.handAddNewItem} className="btn btn-green">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

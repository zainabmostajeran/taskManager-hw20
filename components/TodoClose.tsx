interface TodoCloseProps {
  onClose: () => void
}

const TodoClose: React.FC<TodoCloseProps> = ({ onClose }) => {
  return (
    <div>
      <p>Are you sure delete this Todo?</p>
      <button onClick={onClose}>confirm</button>
      <button>cancle</button>
    </div>
  );
};
export default TodoClose;

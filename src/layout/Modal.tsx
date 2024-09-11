import ReactDOM from 'react-dom';
const ModalLayout = ({ isOpen, onClose, children }) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-[#00000047]`}
    >
      <section className="flex flex-col items-end bg-white">
        {/* 버튼 툴팁 달기 */}
        <button className="bg-mainblue right-0 m-1 p-1" onClick={onClose}>
          <svg className="h-3 w-3">
            <use href="/assets/sprite-sheet.svg#x" />
          </svg>
        </button>
        <div className="w-96">{children}</div>
      </section>
    </div>,
    document.getElementById('modal-root')
  );
};
export default ModalLayout;

// esc로 모달 끄기 추가

import ReactDOM from 'react-dom';
const ModalLayout = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-[#00000047]`}
    >
      <div
        aria-modal="true"
        role="dialog"
        className="flex flex-col-reverse items-end bg-white"
      >
        {/* 버튼 툴팁 달기 */}

        <div className="w-96">{children}</div>
        <button
          className="hover:bg-mainblue right-0 m-1.5 rounded-full p-1.5 hover:text-white"
          onClick={onClose}
        >
          <svg className="h-3 w-3 fill-current">
            <use href="/assets/sprite-sheet.svg#x" />
          </svg>
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};
export default ModalLayout;

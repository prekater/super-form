import {
  type ChangeEvent,
  type ClipboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import './App.css';

const POSITIONS: Record<string, number | string>[] = [
  { left: 0, top: 0, transform: 'unset' },
  { right: 0, top: 0, transform: 'unset' },
  { left: 0, bottom: 0, transform: 'unset' },
  { right: 0, bottom: 0, transform: 'unset' },
];

const CORRECT_VALUE = 'IBS_Cringe_Design_Fest_2026';

function App() {
  const inputLoginRef = useRef<HTMLInputElement>(null);
  const inputPswRef = useRef<HTMLInputElement>(null);

  const [loginValue, setLoginValue] = useState('');

  const handleChangeLoginValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length > 0 &&
      e.target.value.length % 5 === 0 &&
      CORRECT_VALUE.includes(e.target.value)
    ) {
      setIsOpenModal(true);
      if (inputLoginRef.current) {
        inputLoginRef.current.blur();
      }
    }
    setLoginValue(e.target.value);
  };

  const [pswValue, setPswValue] = useState('');

  const handleChangePswValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length > 0 &&
      e.target.value.length % 4 === 0 &&
      CORRECT_VALUE.includes(e.target.value)
    ) {
      setIsOpenModal(true);
      if (inputPswRef.current) {
        inputPswRef.current.blur();
      }
    }
    setPswValue(e.target.value);
  };

  const [formPosition, setFormPosition] = useState<
    Record<string, string | number>
  >({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' });

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpenFinalModal(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPosition =
        POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
      setFormPosition(randomPosition);
      if (inputPswRef.current) {
        inputPswRef.current.blur();
      }
      if (inputLoginRef.current) {
        inputLoginRef.current.blur();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    alert('Чур вводить ручками!');
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => setIsOpenModal(false);

  const [isOpenFinalModal, setIsOpenFinalModal] = useState(false);

  const handleCloseFinalModal = () => setIsOpenFinalModal(false);

  const isCorrect = loginValue === CORRECT_VALUE && pswValue === CORRECT_VALUE;

  return (
    <section id="center">
      <div className="fields-wrapper" style={{ ...formPosition }}>
        <label htmlFor="password">Введите пароль</label>
        <input
          id="password"
          onChange={handleChangePswValue}
          value={pswValue}
          onPaste={handlePaste}
          ref={inputPswRef}
          className="input"
          type="text"
        />
        <br />
        <label htmlFor="login">Введите логин</label>
        <input
          type="password"
          id="login"
          onChange={handleChangeLoginValue}
          value={loginValue}
          onPaste={handlePaste}
          ref={inputLoginRef}
          className="input"
        />
        <br />
        <button onClick={handleSubmit} className="submit-btn">
          Вход
        </button>
      </div>
      {isOpenModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span>Молодец, так держать!</span>
            <button onClick={handleCloseModal} className="modal__close-btn">
              Да, я молодец!
            </button>
          </div>
        </div>
      )}
      {isOpenFinalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span>
              {isCorrect ? 'Ура, всё верно' : 'Что-то введено неверно'}
            </span>
            {!isCorrect && (
              <button
                onClick={handleCloseFinalModal}
                className="modal__close-btn"
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
                    fill="black"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default App;

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
    console.log(`initializing interval`);

    const interval = setInterval(() => {
      const randomPosition =
        POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
      setFormPosition(randomPosition);
    }, 5000);

    return () => {
      console.log(`clearing interval`);
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
        <label htmlFor="login">Введите логин</label>
        <input
          type="text"
          id="login"
          onChange={handleChangeLoginValue}
          value={loginValue}
          onPaste={handlePaste}
          ref={inputLoginRef}
        />
        <label htmlFor="password">Введите пароль</label>
        <input
          type="password"
          id="password"
          onChange={handleChangePswValue}
          value={pswValue}
          onPaste={handlePaste}
          ref={inputPswRef}
        />
        <button onClick={handleSubmit}>Вход</button>
      </div>
      {isOpenModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span>Молодец, так держать!</span>
            <button onClick={handleCloseModal}>Да, я молодец!</button>
          </div>
        </div>
      )}
      {isOpenFinalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span>
              {isCorrect ? 'Ура, всё верно' : 'Вы что-то ввели некорректно'}
            </span>
            {!isCorrect && (
              <button
                onClick={handleCloseFinalModal}
                className="modal__close-btn"
              >
                Сейчас исправлюсь
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default App;

import { useState } from 'react';

const DoanSo = () => {
  const [secretNumber, setSecretNumber] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [guessInput, setGuessInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);

  const generateNewNumber = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuessInput('');
    setMessage('');
    setAttempts(0);
  };

  const handleGuess = () => {
    if (attempts >= 10) {
      setMessage('Bạn đã hết lần thử! Bấm "Chơi lại" để chơi tiếp.');
      return;
    }

    const userGuess = Number(guessInput);

    if (!guessInput || isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Vui lòng nhập một số từ 1 đến 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userGuess === secretNumber) {
      setMessage(` Chúc mừng! Bạn đã đoán đúng sau ${newAttempts} lần thử!`);
      setGuessInput('');
    } else if (userGuess < secretNumber) {
      setMessage(
        newAttempts === 10
          ? ` Quá thấp! Bạn đã hết lượt. Số đúng là ${secretNumber}`
          : ` Quá thấp! Còn ${10 - newAttempts} lượt`
      );
      setGuessInput('');
    } else {
      setMessage(
        newAttempts === 10
          ? ` Quá cao! Bạn đã hết lượt. Số đúng là ${secretNumber}`
          : ` Quá cao! Còn ${10 - newAttempts} lượt`
      );
      setGuessInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGuess();
  };

  return (
   
    <div className="p-10 bg-gray-100 min-h-screen">
    
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">
          Trò chơi đoán số
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Đoán một số từ 1 đến 100
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            placeholder="Nhập số..."
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-lg border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleGuess}
            aria-label="Đoán số"
            title="Đoán số"
            className="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-600"
          >
            Đoán
          </button>
        </div>

        {message && (
          <div className="text-xl font-medium mb-4">
            {message}
          </div>
        )}

        {attempts > 0 && (
          <p className="text-lg text-gray-500 mb-4">
            Số lần thử: <strong>{attempts}</strong>/10
          </p>
        )}

        <button
          onClick={generateNewNumber}
          aria-label="Chơi lại"
          title="Chơi lại"
          className="bg-gray-200 px-6 py-3 text-lg rounded-lg hover:bg-gray-300"
        >
         Chơi lại
        </button>
      </div>
    </div>
  );
};

export default DoanSo;

import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

function App() {
	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	const onClose = () => {
		tg.close();
	};

	return (
		<div style={{ padding: 20, fontFamily: 'sans-serif' }}>
			<h1>Вы — обычный пользователь</h1>
			<button onClick={onClose}>Закрыть</button>
		</div>
	);
}

export default App;

import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';

function App() {
	const { tg, user } = useTelegram();

	useEffect(() => {
		tg.ready();
		// tg.expand();
		tg.requestFullscreen();
	}, []);

	const onClose = () => {
		tg.close();
	};

	const ADMIN_ID = 6842203850;
	const isAdmin = user?.id === ADMIN_ID;

	return (
		<div style={{ padding: 20, fontFamily: 'sans-serif' }}>
			<h1>Вы — {isAdmin ? 'администратор' : 'обычный пользователь'}</h1>
			<button onClick={onClose}>Закрыть</button>
		</div>
	);
}

export default App;

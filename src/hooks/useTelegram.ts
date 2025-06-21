const tg = window.Telegram.WebApp;

export function useTelegram() {
	return {
		tg,
		initData: tg.initData,
		initDataRaw: tg.initDataRaw,
		user: tg.initDataUnsafe.user,
	};
}

import Taskinput from './flag';
import SubmitButton from './button';


export function TaskFull(props) {
    return (
        <div className="h-96 grid content-between border-2 border-zinc-300">
            <div className="bg-gray-100 h-32  border-b-2 border-zinc-300">
                <div className="flex flex-row justify-between">
                    <div className="text-sky-500 text-3xl pl-4 pt-2 font-semibold">Название таска</div>
                    <div className="text-black font-semibold text-3xl pt-2 px-3">1000</div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div className="py-2 pl-4 pr-2 text-lime-500 font-bold text-xl">crypto</div>
                        <div className="text-black font-semibold text-xl pt-2 px-2">#hard</div>
                        <div className="text-black font-semibold text-xl pt-2 px-2">#kekw</div>
                        <div className="text-black font-semibold text-xl pt-2 px-2">#reverse?</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.41538 9.65676L0.190373 5.43175C-0.0634576 5.17792 -0.0634576 4.76637 0.190373 4.51251L1.10959 3.59327C1.36342 3.33941 1.775 3.33941 2.02883 3.59327L4.875 6.43941L10.9712 0.343266C11.225 0.0894355 11.6366 0.0894355 11.8904 0.343266L12.8096 1.26251C13.0635 1.51634 13.0635 1.9279 12.8096 2.18175L5.33462 9.65678C5.08076 9.91061 4.66921 9.91061 4.41538 9.65676Z" fill="black" />
                        </svg>
                        <div className="text-black font-normal text-xl pr-3 pl-2">3</div>
                    </div>
                </div>

                <div className="text-sky-500 px-3 font-medium">by Nlxes (@N1x3s)</div>

            </div>
            <div className="h-full px-3">
                <span>I seem to have forgottenn my flag ...I seem to have forgotten my flag ...I seem ton my flag ...I seem to have forgotten my flag ...I seem ton my flag ...I seem to have forgotten my flag ...I seem ton my flag ...I seem to have forgotten my flag ...I seem to my flag ...I seem to have forgotten my flag ...I seem to have forgotten my flag ...I seem to have forgotten my flag ...I seem to have forgotten my flag ...I seem to have forgotten my flag ...</span>
                <div className="text-red-600 py-2 ">Прикрипленный файл</div>
                <div className="py-3 flex flex-row justify-between">
                    <Taskinput />
                    <SubmitButton />
                </div>
            </div>
            <div className="bg-gray-100 h-10 flex justify-between items-center px-3 font font-semibold border-t-2 border-zinc-300">
                <div className="flex flex-row items-center">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.625 12.5938C1.625 12.8172 1.44092 13 1.21875 13H0.40625C0.184082 13 0 12.8172 0 12.5938V0.8125C0 0.361816 0.361816 0 0.8125 0C1.26318 0 1.625 0.361816 1.625 0.8125V12.5938ZM12.0936 0C11.9319 0 11.7632 0.0342773 11.6025 0.107479C10.4424 0.637127 9.58242 0.816893 8.86539 0.816893C7.34297 0.816893 6.45811 0.00794727 4.70387 0.00769336C4.08535 0.00775684 3.34141 0.123576 2.4375 0.399902V9.29932C3.25 9.04582 3.95764 8.94131 4.59189 8.94131C6.46141 8.94131 7.76318 9.74822 9.63447 9.74822C10.4447 9.74822 11.3615 9.59661 12.4554 9.16195C12.7994 9.03652 13 8.74453 13 8.43223V0.780254C13 0.281836 12.576 0 12.0936 0Z" fill="black" />
                    </svg>
                    <span className="pl-2">Simen228</span>
                </div>
                <span>2 hours ago by GO_UKRAINE!</span>
            </div>
        </div>
    )
}
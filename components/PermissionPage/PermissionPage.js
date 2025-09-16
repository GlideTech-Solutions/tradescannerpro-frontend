import { useTheme } from '../../context/ThemeContext';
import PageLogo from '../PageLogo/PageLogo';
import "./PermissionPage.scss";
export default function PermissionPage() {
    const { isDarkMode } = useTheme();
    return (
        <div className='permission-page-move-detection-section'>

            <PageLogo />

            <div className='permission-page-move-detection-alignment'>
                <div className='welcome-line'>
                    <p>Access Denied</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>You don’t have permission to
                        view this page</h1>
                    <div className='run-button-alignment'>
                        <button> <img src='/assets/icons/user-key.svg' alt='User Key icon' />Request Access</button>
                    </div>
                </div>

                <div className='permission-page-bottom-section'>

                     {/* <ThemeVideo
                     darkSrc="/assets/video/dark_video_wave.mp4"
                     lightSrc="/assets/video/light_video_wave.mp4"
                     className="bg-video"
                   /> */}
                    <div className='explosive-img-section'>
                        <img src='/assets/images/permission-icon.png' alt='permission img' />
                    </div>
                </div>
            </div>

        </div>
    )
}

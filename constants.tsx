import { AppInfo, GameInfo } from './types';

/**
 * EDIT THIS SECTION TO CHANGE ICONS MANUALLY:
 * - icon: Path to local file (e.g., 'image.png') or web URL (e.g., 'https://...')
 * - iconClass: Tailwind CSS for styling (e.g., 'scale-50', 'invert', 'brightness-0')
 */
export const QUICK_APPS: AppInfo[] = [
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png' 
  },
  { 
    name: 'Xbox Cloud', 
    url: 'https://www.xbox.com/play', 
    icon: 'https://cdn-icons-png.flaticon.com/512/1/1321.png',
    iconClass: 'scale-[0.7] brightness-0 invert' 
  },
  { 
    name: 'Discord', 
    url: 'https://discord.com', 
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURVdl8v///1Zl8lZk8VZk8e7w/fj4/ldk8lZk8VZk8lZk8VZl8ldk8lZk8VZk8aSr+LrA+WJu8rG3+GZy84SO9a20+MXK+ldk8pOc9ldk8d7h/HaB9Gt38+Tm/Fdl8Vdl8lZl8VUA9gBl/0dwTEdwTCQujVkAAAAldFJOU///J+z7///2zdQQCo6cXP//////////Mv+e/////56envv/AAADM8XgAAABK0lEQVQ4y4VT2baDIAwMKIoriktdansf+v/feMFE0VoP86BhHIHJAp8daVnIIAwDWZSpY2EL+CuGHfGbfwmyPIQTwjw7CngCFyTcCR4B/EDw2AT853ej4CjIErhBkq2CHG6RWwF3969r90Qv3AhGWjRqYn07DG3PJtUQ+feBlPLTCHaAIEWcQknaip1QEV1CgcEzOguiJ/IFSAw0+4JGXgIlab2BWLeJMKZkAZqc8ad6YWypcbsZjZJgsJQ5tmOsMxeyq4EEeERnqRagZ6wHaO2qoyOkMynU+qqUcEYl2azYBRXZLPcjop5ygUFHiaJUK8Mtc6u0Vu1svERqS/VWrEaLaSviJDTV4nUq917m5lRub8P4W87btP629w+Of/TsJuNxeEd+me678f8HQVYjIhOHP3oAAAAASUVORK5CYII=',
    iconClass: 'scale-[1.0]'
  },
   { 
    name: 'PubG', 
    url: 'https://now.gg/play/proxima-beta/2609/pubg-mobile-resistance', 
    icon: 'https://cdn.now.gg/apps-content/com.tencent.ig/icon/pubg-mobile-resistance.png',
    iconClass: 'scale-[1.0]'
  },
  { 
    name: 'Roblox', 
    url: 'https://now.gg/play/roblox-corporation/5349/roblox', 
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC80lEQVR4AdSYgXkUIRCFTyvQDrQDrSBagVqB2oFWYKxAO9AOjBVoKjAdaAemg+T9m3DfHAs7ENhbko/JciwM72dm2eMe7u75Xy3AL/Geyl7Ihig1AIjGPkk5IFe31w+6PpNtUmoAXiUUAvRF7X9k/2U/ZEcFqgFArPRlyyPdeS1LAT1R+yqlFABxtWnCmAD0V+qxb7q+k3UDKgXwVl+a3IJoxAMBDEadNmBdB6kOpQAnqcGNbRaI54fniPQjasVApQA9IuDxkqJsAGwExUAlAKwGzj0Bve8zpwVi6569g0oAjrH6JfDoiN9BpyUAa+R/iWCvD0AnJQA8VJ6zre6fewDsFNhWAr15zzwAwuQ52er+pSa+8ABGzX9p3/3e6c8DGDkC59K/WwIg9zH6jWhuBEZe/Sn/WdWlCAyf/x5AawSea4L3su+yf7KeZcp/HOYiwPeQKP/pXmwIvlBvxAPxVHWMOm362FSm/MdDDqB19c9wHhlQiP8ctdd+xA+LM43LAbTm/z7E0yyH/1oXZ7/6uM0BdJ2EiYx1XZwUAPnPGcDMWVUlvGxzuUFdFycF0HWCiIKNAYuaiz+S/9h+QAqgNcScouyB3QruvjgpgNZJWB1E82sDvzoAEw7sb7nZYLPNIQZAfEv+57TxXBEZ/Of6lLQf7EAMSAHQPqKxORzkPyJjgNb8x+daNlt9JooBWkOMz7Vslv9MZAFGFo9WNwIjA5D/yZejjcC9y3/CYgFGjkAy/y3AyOLRmcx/boQI0OGlGviuTl3VYUo2/1EYAKgjnF9/AXmghjeyrzIc6LJZ+bk0swWI+3Gq+qhGzraPdd0KiIXV9OmyBGBHsIWlgDgizl7vdmCHeheAWEcA4pDOYR2jfgMU977750XxuC2NAH2XjCggHghgMOq0Abs0duledvsMg3oBBH/haoF4fniOeJ5Iwxqgo0UgCM9d2cnY0dgIYqDcGNqHAUCMNQvEls3WHb+DXPE4XCuF8F1jiLXvoADk+rgGAAD///XR0HIAAAAGSURBVAMAy6KF4VwrNYcAAAAASUVORK5CYII=',
    iconClass: 'scale-[0.7] brightness-0 invert' 
  },
  { 
    name: 'GeForce Now', 
    url: 'https://play.geforcenow.com', 
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAQAElEQVR4Aex9B1gU1/f2FnpHQOkiKF2QDiIooMaexJaYaGzRKJbYNcZYYvwZSzR2oyYae+81sdKkF5HeO9JFev1Ost+fB82yzB12YcvhuY537pxz7rnvmXfmlplZ1ppHDEyIgMQiwGLgHyIgwQggASQ4+Nh0BgMJgGeBRCOABJDo8GPjJZgAGHxEALtAeA5IOAJ4B5DwE0DSm48EkPQzQMLbjwSQ8BNA0puPBJDEMwDb3IYAEqANCsxIIgJIAEmMOra5DQEkQBsUmJFEBJAAkhh1bHMbAkiANigwIwkIfNhGJMCHiOC+RCGABJCocGNjP0QACfAhIrgvUQggASQq3NjYDxFAAnyICO5LFAISRACJiis2liICSACKQKGYeCKABBDPuGKrKCKABKAIFIqJJwJIAPGMK7aKIgJIAIpAibQYOt8hAkiADqHBA5KAABJAEqKMbewQASRAh9DgAUlAAAkgCVHGNnaIABKgQ2jwgDgg0FkbkACdIYTHxRoBJIBYhxcb1xkCSIDOEMLjYo0AEkCsw4uN6wwBJEBnCOFxsUZAjAkg1nHDxvEJASQAn4BEM6KJABJANOOGXvMJASQAn4BEM6KJABJANOOGXvMJASQAn4AUKjPoDGUEkACUoUJBcUQACSCOUcU2UUYACUAZKhQURwSQAOIYVWwTZQSQAJShQkFRQIDURyQAKWIoL1YIIAHEKpzYGFIEkACkiKG8WCGABBCrcGJjSBFAApAihvJihYAYEUCs4oKN6SYEkADdBDRWI5wIIAGEMy7oVTchgAToJqCxGuFEAAkgnHFBr7oJASRANwEt0GrQOG0EkAC0oUNFcUAACSAOUcQ20EYACUAbOlQUBwSQAOIQRWwDbQSQALShQ0VhQKCrPiABuoog6os0AkgAkQ4fOt9VBJAAXUUQ9UUaASQApfBtG16/Y2QrJkEgQCkAAhNCAggMWjQsCgiIMAFEAV70UdgRQAIIe4TQP4EigAQQKLxoXNgRQAIIe4TQP4EigAQQKLxoXNgRQAIIe4S4+YdlfEMACcA3KNGQKCKABBDFqKHPfEMACcA3KNGQKCKABBDFqKHPfEMACcA3KNFQdyDA7zqQAPxGFO2JFAJIAFEAVLpLbcAAAABJRU5ErkJggg==',  },
  { 
    name: 'Movies', 
    url: 'https://bcine.app', 
    icon: 'https://www.pngmart.com/files/23/Movie-Icon-PNG-HD.png',
    iconClass: 'scale-[0.7] brightness-0 invert' 
  }
  
  
];

export const GAMES: GameInfo[] = [
  {
    id: 'mc',
    name: 'Minecraft',
    description: 'Infinite exploration and building.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
    url: 'https://eaglercrafthub.com'
  },
  {
    id: 'roblox-g',
    name: 'Roblox',
    description: 'User-generated gaming platform.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Roblox_logo_2022_white.svg',
    url: 'https://now.gg/play/roblox-corporation/5349/roblox'
  },
  {
    id: 'fortnite-g',
    name: 'Fortnite',
    description: 'Battle Royale and creative builds.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Fortnite_Logo.svg',
    url: 'https://www.xbox.com/play/games/fortnite/BT5P2X999VH2'
  },
  {
    id: 'among-us',
    name: 'Among Us',
    description: 'Survival and social deduction.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg',
    url: 'https://now.gg/play/innersloth-llc/4047/among-us'
  }
];
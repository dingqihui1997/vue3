// language文件夹下的index.js 
// zh, en, id 分别为三种语言文件
import { createI18n } from 'vue-i18n';
import zh from './zh-CN';
import en from './en-US';
import id from './zh-TW';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('language') || 'zh-CN', //设置默认语言
    messages: {
        'zh-CN': zh,
        'en-US': en,
        'id-ID': id
    }
});

export default i18n;


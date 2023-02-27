export default function setCookie(name: string, value: string, days: number) {
    let expires: string = '';

    if (days) {
        let date: Date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
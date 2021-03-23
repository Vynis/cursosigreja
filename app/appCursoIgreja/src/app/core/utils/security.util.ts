import { Usuario } from "../_models/usurario.model";


export class SecurityUtil {
    public static set(dados: any) {
        const data = JSON.stringify(dados.usuario);
        localStorage.setItem('usuario', btoa(data));
        const token = dados.token;
        localStorage.setItem('token', token);
    }

    public static getUsuario(): Usuario {
        const data = localStorage.getItem('usuario');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static setUsuario(usuario : Usuario) {
        const data = JSON.stringify(usuario);
        localStorage.setItem('usuario', btoa(data));
    }

    public static getToken(): string {
        const data = localStorage.getItem('token');
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        const token = this.getToken();

        if (token)
            return true;
        else
            return false;
    }

    // public static isInRole(role: string): boolean {
    //     const user = this.getUsuario();

    //     if (!user) 
    //         return false;

    //     if (!user.roles || user.roles.length == 0) 
    //         return false;

    //     return user.roles.includes(role);
    // }

    public static clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }
}
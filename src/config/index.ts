export interface ServerConfig {
  port: string;
  host: string;
}

export interface MailConfig {
  secret: string;
  mail: string;
}

export interface DBConfig {
  host: string;
  port: string;
  dbname: string;
}

export interface AuthConfig {
  secret: string;
  expire: number;
}

export const serverConfig: ServerConfig = {
  port: '3030',
  host: '127.0.0.1'
}

export const mailConfig = {
  secret: '',
  mail: '15099802136@163.com'
}

export const dbConfig: DBConfig = {
  host: '127.0.0.1',
  port: '27017',
  dbname: 'blog'
}

export const authConfig = {
  secret: 'onlyblog',
  expire: 60 * 60 * 2 // token 有效期，单位 s
}

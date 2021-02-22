import { Context } from "koa";

export interface DefaultContext {
  success: (data: unknown, code?: 200 | 201) => void;
  error: (code: number, message?: string) => void;
}

export interface AppContext extends DefaultContext, Context {}

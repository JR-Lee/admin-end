import { Context } from "koa";

export interface DefaultContext {
  success: (data: unknown) => void;
  error: (code: number, message?: string) => void;
}

export interface AppContext extends DefaultContext, Context {}
import authenticationService, { SignInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import axios from "axios";
export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function githubSignPost(req: Request, res: Response) {
  const { code } =  req.body;

  try{
    const result = await authenticationService.githubSignIn(code);

    return res.send(result);
  } catch(err) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

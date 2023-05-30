import request from "@/utils/request";
import { LoginParamsType } from "./data";

export async function accountLogin(params: LoginParamsType): Promise<any> {
	return request({
		url: "/login",
		method: "POST",
		data: params,
	});
}

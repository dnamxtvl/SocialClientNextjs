"use server";

import { redirect } from "next/navigation";

export const redirectToRoute = (route: string) => {
    return redirect(route);
}
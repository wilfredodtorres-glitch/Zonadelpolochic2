"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAsRead(id, table) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { error } = await supabase
    .from(table)
    .update({ leido: true })
    .eq("id", id);

  if (error) {
    console.error("Error al marcar como leído:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

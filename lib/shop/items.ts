import { ShopItem } from "@/types/ShopItem";
import axios from "axios";

const API_BASE = "https://localhost:7256/shop/item";

export async function listItems(): Promise<ShopItem[]> {
  return axios
    .get<ShopItem[]>(API_BASE, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to fetch items");
    });
}

export async function getItem(id: string | number): Promise<ShopItem> {
  return axios
    .get<ShopItem>(`${API_BASE}/${id}`, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to fetch item");
    });
}

export async function createItem(item: Omit<ShopItem, "id"> & { image: string | File }): Promise<ShopItem> {
  const payload = { ...item };

  console.log("Creating item with payload:", payload);
  if (typeof window !== "undefined" &&
      typeof File === "function" &&
      item.image instanceof File) {
    payload.image = await fileToBase64(item.image);
  }
  console.log("Final payload for creation:", payload);

  return axios
    .post<ShopItem>(API_BASE, payload, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => {
      throw new Error("Failed to create item");
    }
  );
}

// Utility function to convert File to base64 string
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
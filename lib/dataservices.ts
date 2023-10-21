export async function getData(url) {
  let res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function deleteData(id) {
  let res = await fetch("/api/product/", { method: "DELETE", body: JSON.stringify({ id: id }) });
  if (!res.ok) {
    console.log("delete failed");
  }
  return res.json();
}
export async function getImages(url, { arg }: { arg: string }) {
  return fetch(url, { method: "POST", body: JSON.stringify({ searchValue: arg }) }).then((res) => {
    return res.json();
  });
}

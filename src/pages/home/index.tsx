import React from "react";

function index() {
  async function checkUser(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    console.log("クリックです");

    const token = document.cookie.match(
      new RegExp("XSRF-TOKEN" + "=([^;]*);*")
    )!![1];

    const response = await fetch("http://localhost:8090/api/user", {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": token,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + "19|WzstV43iA9LkJ2KeSlSe2JAN8cTSFRvEXKyaJKiv"
      },
    });
    console.log(response.json());
  }

  return (
    <div>
      <button
        type="submit"
        className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-green-500 "
        onClick={checkUser}
      >
        Sign In
      </button>
    </div>
  );
}

export default index;

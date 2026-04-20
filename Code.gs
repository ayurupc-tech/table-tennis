function doGet(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("users");

  const type = e.parameter.type;

  // ===== ユーザー存在確認 =====
  if (type === "checkUser") {

    const userId = e.parameter.userId;
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === userId) {
        return json({ status: "exists" });
      }
    }

    return json({ status: "new" });
  }

  // ===== 書き込み =====
  if (type === "write") {

    const userId = e.parameter.userId;
    const name = e.parameter.name;

    sheet.appendRow([
      new Date(),
      userId,
      "",
      "",
      name
    ]);

    return json({ result: "ok" });
  }

  // ===== 取得 =====
  if (type === "getUser") {

    const userId = e.parameter.userId;
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === userId) {
        return json({
          name: data[i][4]
        });
      }
    }

    return json({ result: "not_found" });
  }

  return json({ result: "no_action" });
}


// 共通
function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* eslint-disable prettier/prettier */
export default ({ title, content, link, linkLabel }) => (
  `
    <!doctype html>  
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family:Roboto;background-color : #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="20%"></td>
            <td width="60%">
              <div style="padding: 19px 0px;">
                <img style="width:170px;height:62px;" src="https://oifa.tech/oifaLogo.png" alt=""/>
              </div>
              <div style="border-top: 1px solid #f2f4f6;"></div>
              <div style="padding: 30px 10px;">
                <h1 style="font-size:26px;color:#000020;font-weight:700;margin:0px">
                  ${title}
                </h1>
                <div style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;padding:20px 0 25px 0" >
                  ${content}
                </div>
                ${!!link && !!linkLabel ? (`
                  <div style="">
                    <a href=${link} style="width:261px;display:inline-block;text-decoration:none;box-sizing:border-box">
                      <div style="text-align: center;width: 100%;padding: 5px 0; box-sizing: border-box ; border-radius: 4px;background-color: #FEF9EE">
                        <p style="font-family: Roboto ; font-size: 16px; color: #F9BF58;font-weight:500;" >${linkLabel}</p>
                      </div>
                    </a>
                  </div>
                `) : ""}
              </div>
            </td>
            <td width="20%"></td>
          </tr>
        </table>
      </body>
    </html>
  `
);

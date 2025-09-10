import moment from "moment"

export const customerTemplate = (data) => `<!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  @media (max-width: 600px) {
      a {
          font-size: 12px;
          overflow:hidden;
      }
    .mainContainer{
     padding:20px 15px !important
    }
  }
  </style>
  </head>
  <body style="font-family: 'Arial', sans-serif; color: #333333; line-height: 1.7; padding: 20px; background-color: #f4f4f4; margin: 0;">
      <div class="mainContainer" style="max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          <!-- Logo Section -->
          <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://old.umbrellapackaging.com" target="_blank">
                  <img src="https://99de0d612a.imgdist.com/public/users/Integrators/BeeProAgency/1039128_1024229/Umbrella-packaging-final-logo-png.png" alt="Umbrella Packaging" title="Umbrella Packaging" style="width: 200px; max-width: 100%; display: block; margin: 0 auto;">
              </a>
          </div>
  
          <!-- Greeting Section -->
          <h1 style="font-size: 24px; font-weight: bold; color: #2a2e7b; text-align: center; margin: 0 0 20px;">Dear ${data}</h1>
          
          <!-- Introductory Message -->
          <p style="font-size: 16px; text-align: center; color: #555555; margin: 0 0 30px;">
              Thank you for sharing the order details with us! We are currently reviewing your request and will provide the best price quote within the next <strong>45 minutes</strong>.
          </p>
  
          <!-- Main Content Section -->
          <div style="padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-bottom: 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 10px;">
                  We greatly appreciate the opportunity to serve your packaging needs. In the meantime, if you have any urgent inquiries, feel free to contact us using the information below.
              </p>
  
              <!-- Contact Info Section -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                  <!-- Left Column -->
                  <div style="text-align: left; flex: 1;">
                      <p style="margin: 0; font-weight: bold;">Best regards,</p>
                      <p style="margin: 0;">Manager Sales<br><span style="color: #2a2e7b;">Umbrella Custom Packaging</span></p>
                  </div>
                  <!-- Right Column (Contact Details) -->
                  <div style="text-align: right; flex: 1;">
                      <p style="margin: 0;"><a href="https://umbrellapackaging.com/" style="text-decoration: none; color: #0076a8; font-weight: bold;">www.umbrellapackaging.com</a></p>
                      <p style="margin: 0;"><a href="tel:+17472470456" style="text-decoration: none; color: #0076a8; font-weight: bold;">+1-747-247-0456</a></p>
                  </div>
              </div>
          </div>
  
          <!-- Social Media Links Section -->
          <div style="text-align: center; margin-bottom: 20px;">
              <table style="display: inline-block;">
                  <tr>
                      <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/Umbrella-Custom-Packaging-102088152747218/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" alt="Facebook" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://twitter.com/umbrellapack" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" alt="Twitter" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.linkedin.com/in/umbrella-custom-packaging-2a3b60257/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/linkedin@2x.png" alt="LinkedIn" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/umbrellacustompackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/instagram@2x.png" alt="Instagram" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.pinterest.com/UmbrellaCustomPackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/pinterest@2x.png" alt="Pinterest" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                  </tr>
              </table>
          </div>
  
          <!-- Footer Section -->
          <p style="text-align: center; font-size: 14px; color: #888888;">
              For further inquiries, please contact us at <a href="mailto:inquiry@umbrellapackaging.com" style="text-decoration: underline; color: #0076a8;">inquiry@umbrellapackaging.com</a>
          </p>
      </div>
  
      <!-- Responsive Design Media Queries -->
      <style>
          @media only screen and (max-width: 600px) {
              body {
                  padding: 10px;
              }
              div {
                  padding: 20px;
              }
              h1 {
                  font-size: 20px;
              }
              p {
                  font-size: 14px;
              }
              table {
                  display: block;
                  width: 100%;
              }
          }
      </style>
  </body>
  </html>`


export const adminTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <body>
        <div>
           <!-- Header Section -->
           <div>
            <h1>New Quote Request</h1>
            <p>A customer has submitted a request for a quote. Below are the details.</p>
        </div>
        
            <div  style="padding-bottom: 50px;">
                
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Company Name:</td>
                        <td>${data.companyName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:</td>
                        <td>${data.phoneNumber}</td>
                    </tr>
                </table>
            </div>
    
            
    
            <!-- Quote Details Table -->
            
            <table>
            
                    <tr>
                    <td>Box Style :</td>
                    <td>${data.boxStyle}</td>
                </tr>
                <tr>
                    <td>Length:</td>
                    <td>${data.boxStyle}</td>
                </tr>
                <tr>
                    <td>Width:</td>
                    <td>${data.width}</td>
                </tr>
                <tr>
                    <td>Depth:</td>
                    <td>${data.depth}</td>
                </tr>
                <tr>
                    <td>Stock:</td>
                    <td>${data.stock}</td>
                </tr>
                <tr>
                    <td>Colors:</td>
                    <td>${data.color}</td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td>${data.quantity}</td>
                </tr>
                <tr>
                    <td>Add-ons:</td>
                    <td>${data.addons}</td>
                </tr>
                <tr>
                    <td>File:</td>
                    <td><img style="width:'100%'" src=${data.image} /></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td>${data.message}</td>
                </tr>

                 <tr>
                    <td>---</td>
                </tr>

                 <tr>
                    <td>Date:</td>
                    <td>${moment(data.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                </tr>
               
                <tr>
                    <td>Page URL:</td>
                    <td>${data.pageUrl}</td>
                </tr>
                 <tr>
                    <td>User Agent:</td>
                    <td>${data.device}</td>
                </tr>
                 <tr>
                    <td>Remote IP:</td>
                    <td>${data.ip}</td>
                </tr>
            </table>
 
        </div>
    </body>`

export const instantTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
</head>
<body>
    <div>
        <!-- Header Section -->
        <div>
            <h1>New Quote Request</h1>
            <p>A customer has submitted a request for a quote. Below are the details.</p>
        </div>
        
        <div style="padding-bottom: 50px;">
            <table>
                <tr>
                    <td>Name:</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>${data.phoneNumber}</td>
                </tr>
            </table>
        </div>

        <!-- Quote Details Table -->
        <table>
            <tr>
                <td>File:</td>
                <td>
                    ${data.image ?
        `<img style="width: 100%; max-width: 300px; height: auto; display: block;" src="${data.image}" alt="Uploaded file" />` :
        'No image provided'
    }
                </td>
            </tr>
            <tr>
                <td>Description:</td>
                <td>${data.message || 'No description provided'}</td>
            </tr>

                <tr>
                    <td>---</td>
                </tr>
              
                <tr>
                    <td>Date:</td>
                      <td>${moment(data.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                </tr>
                  <tr>
                    <td>Page URL:</td>
                    <td>${data.pageUrl}</td>
                </tr>
                 <tr>
                    <td>User Agent:</td>
                    <td>${data.device}</td>
                </tr>
                 <tr>
                    <td>Remote IP:</td>
                    <td>${data.ip}</td>
                </tr>

        </table>
    </div>
</body>
</html>`
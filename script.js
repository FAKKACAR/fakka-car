/* ==========================================
ربط فَكّة كار مع Supabase
========================================== */

const SUPABASE_URL = "https://baqpjdabwdexrchlnyhm.supabase.co";

const SUPABASE_KEY = "sb_publishable_N616c-Stdip3YqO4ehA6fA_D-4CfwjL";


/* ==========================================
عناصر الصفحة
========================================== */

const statusText = document.getElementById("statusText");

const carTitle = document.getElementById("carTitle");
const carYear = document.getElementById("carYear");
const carColor = document.getElementById("carColor");
const carPlate = document.getElementById("carPlate");

const carImage = document.getElementById("carImage");
const carPlaceholder = document.getElementById("carPlaceholder");

const ownerUsername = document.getElementById("ownerUsername");
const ownerName = document.getElementById("ownerName");

const infoBrand = document.getElementById("infoBrand");
const infoModel = document.getElementById("infoModel");
const infoYear = document.getElementById("infoYear");
const infoColor = document.getElementById("infoColor");

const whatsappBtn = document.getElementById("whatsappBtn");
const snapchatBtn = document.getElementById("snapchatBtn");
const phoneBtn = document.getElementById("phoneBtn");


/* ==========================================
قراءة كود السيارة من الرابط
========================================== */

const params = new URLSearchParams(window.location.search);

const carCode = params.get("car") || "FC0001";


/* ==========================================
تحميل بيانات السيارة
========================================== */

async function loadCar() {

try {

const requestUrl =
`${SUPABASE_URL}/rest/v1/cars?car_code=eq.${encodeURIComponent(carCode)}&select=*`;


const response = await fetch(requestUrl, {

headers: {

apikey: SUPABASE_KEY,

Authorization:
`Bearer ${SUPABASE_KEY}`

}

});


if (!response.ok) {

throw new Error(
`Supabase error: ${response.status}`
);

}


const cars = await response.json();


if (!cars || cars.length === 0) {

console.error(
"لم يتم العثور على السيارة:",
carCode
);

return;

}


const customer = cars[0];


/* بيانات السيارة */

statusText.textContent =
customer.status || "متوقفة بالطريق";


carTitle.textContent =
`${customer.brand_english} ${customer.model_english}`;


carYear.textContent =
customer.year;


carColor.textContent =
customer.color;


carPlate.textContent =
customer.plate || "";


/* بيانات المالك */

ownerUsername.textContent =
customer.username || "";


ownerName.textContent =
customer.owner_name || "";


/* معلومات السيارة */

infoBrand.textContent =
customer.brand_arabic;


infoModel.textContent =
customer.model_arabic;


infoYear.textContent =
customer.year;


infoColor.textContent =
customer.color;


/* صورة السيارة */

if (
customer.image_url &&
customer.image_url.trim() !== ""
) {

carImage.src =
customer.image_url;

carImage.style.display =
"block";

carPlaceholder.style.display =
"none";

} else {

carImage.style.display =
"none";

carPlaceholder.style.display =
"flex";

}


/* رقم الجوال */

const cleanPhone =
String(customer.phone || "")
.replace(/\D/g, "");


/* واتساب */

const whatsappText =
encodeURIComponent(

customer.whatsapp_message ||

"السلام عليكم، أتواصل معك عن سيارتك عن طريق فَكّة كار"

);


whatsappBtn.href =
`https://wa.me/${cleanPhone}?text=${whatsappText}`;


/* سناب شات */

const cleanSnapchat =
String(customer.snapchat || "")
.replace(/^@/, "");


snapchatBtn.href =
`https://www.snapchat.com/add/${cleanSnapchat}`;


/* الاتصال */

phoneBtn.href =
`tel:+${cleanPhone}`;


console.log(
"تم تحميل سيارة فَكّة كار:",
customer.car_code
);

} catch (error) {

console.error(
"خطأ في تحميل بيانات السيارة:",
error
);

}

}


/* ==========================================
تشغيل فَكّة كار
========================================== */

loadCar();

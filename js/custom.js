var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
var data = '';
var attractions;
var attractionLen;
var btn = document.querySelector('.popular');
var list = document.querySelector('.list');
var AreaSearch = document.querySelector('.selectoption');
var areaname = document.querySelector('.areaName');

xhr.onload = function() {
    data = (JSON.parse(xhr.responseText));
    attractions = data.result.records;
    console.log(data);

    attractionLen = data.result.records.length;
    var allArea = []; //存放鄉鎮名字
    var filterArea;
    for (var i = 0; i < attractionLen; i++) {
        filterArea = allArea.push(attractions[i].Zone);
    }

    filterArea = allArea.filter(function(item, i, array) { //過濾重複的鄉鎮名字
        // console.log(filterArea);
        return array.indexOf(item) === i;
    });

    // //將allarea的空陣列放入所有地區並排除重複後再放入selectArea中
    var selectStr = '';
    for (var i = 0; i < filterArea.length; i++) {
        selectStr += '<option>' + filterArea[i] + '</option>';
        AreaSearch.innerHTML = '<option>--請選擇行政區--</option>' + selectStr;
    }
    AreaSearch.addEventListener('change', function(e) { //點選鄉鎮選單時觸發

        var searchValue = e.target.value;

        //獲取點擊的物件的value
        getdata(searchValue);
    });

    //按下熱門按鈕時觸發
    btn.addEventListener('click', function(e) {
        var searchValue = e.target.value;
        getdata(searchValue);


    })

    function getdata(searchValue) {

        var str = "";
        for (var i = 0; attractionLen > i; i++) {
            if (searchValue == attractions[i].Zone) {
                areaname.textContent = attractions[i].Zone;
                console.log(attractions[i].Picture1);
                str += `<li class="countrybox">
               <div class="picture"style="background-image: url(` + attractions[i].Picture1 + `)";>
                   <p class="countrytitle"> ` + attractions[i].Name + `</p>
                   <p class="coutryposition">` + attractions[i].Zone + `</p>
               </div>
               <div class="countryInfo">
               <p><img style="margin-right: -2px;"src="img/icons_clock.png" alt="" />
               ` + attractions[i].Opentime + `
               </p>
               <p><img src="img/icons_pin.png" alt="" />
               ` + attractions[i].Add + `
               </p>
               <p ><img class="phone" src="img/icons_phone.png" alt="" />
               ` + attractions[i].Tel + `
               </p>
               <p class="ticklayout"><img src="img/icons_tag.png" alt="" />
               ` + attractions[i].Ticketinfo + `
               </p>
               
               </div>
        </li>`
                list.innerHTML = str;
            }
        }
    }
    //gotop至頂
    var gotop = document.querySelector('.gotop');
    gotop.addEventListener("click", function(e) {
        e.preventDefault();
        window.document.body.scrollTop = 0;
        window.document.documentElement.scrollTop = 0;
    });



}
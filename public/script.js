/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

let cid_name = [];
let org_total = [];
let ind_Total = [];
let numLegs;
let counter;
let rep;
const Samsons_key = '0e31f29705fa26f604e00f070aea5e11';
const Jooyongs_key = '165cf0bdb1b94281cb53560f4b66d567';
const tc_results = document.querySelector('.tc_results');
const l_select = document.querySelector('.l_select');
const ic_results = document.querySelector('.ic_results');
const cs_results = document.querySelector('.cs_results');

const chosen_State = document.querySelector('.chosen_State');

$(document).ready(() => {
  $('.map').usmap({});
});
async function getData(state) {
  const leg = [];
  const responce = await fetch(
    `http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=${Samsons_key}`
  );
  const data = await responce.json();
  leg.push(data.response.legislator);
  state_Data = leg;
  numLegs = leg[0].length;
  rep = numLegs - 2;
  chosen_State.innerText = `Your chosen state is ${state} which has ${rep} Representatives and 2 Senators`;
  return leg[0];
}
async function getContr(cid_name) {
  counter += 1;
  const contr_arr = [];
  org_total = [];
  const leg_names = [];
  const contr_Res = await fetch(
    `https://www.opensecrets.org/api/?method=candContrib&cid=${cid_name[0]}&cycle=2020&output=json&apikey=${Jooyongs_key}`
  );
  const contributors = await contr_Res.json();
  for (num in contributors.response.contributors.contributor) {
    org_total.push([
      contributors.response.contributors.contributor[num]['@attributes']
        .org_name,
      contributors.response.contributors.contributor[num]['@attributes'].total
    ]);
  }
  leg_names.push([cid_name[1], cid_name[2]]);
  
  contr_arr.push(cid_name[1], org_total);
  if (counter <= numLegs) {
    drop_down(leg_names);
  } else if (counter > numLegs) {
    display_IndividualContr();
  }
}

// Beginning Jooyong Function 2
async function getContrByIndustry(cid_name) {
  const array1 = [];
  ind_Total = [];
  const ind_Names = [];
  const industry_js = await fetch(
    `https://www.opensecrets.org/api/?method=candIndustry&cid=${cid_name[0]}&cycle=2020&output=json&apikey=165cf0bdb1b94281cb53560f4b66d567`
  );
  const industries = await industry_js.json();
  for (num in industries.response.industries.industry) {
    ind_Total.push([
      industries.response.industries.industry[num]['@attributes'].industry_name,
      industries.response.industries.industry[num]['@attributes'].total
    ]);
  }
  ind_Names.push(cid_name[1]);
  array1.push(cid_name[1], ind_Total);
  // console.log(array1);
  if (counter > numLegs) {
    display_IndustryContr();
  }
  // // End Jooyong Function 2
}
// Beginning Summary Function
async function getSummary(cid_name) {
  const array3 = [];
  const summs = [];
  const totals_js = await fetch(`https://www.opensecrets.org/api/?method=candSummary&cid=${cid_name[0]}&cycle=2020&output=json&apikey=${Jooyongs_key}`);
  const candsumm = await totals_js.json();
  for (num in candsumm.response.candsumm.candsummary) {
    summs.push([
      candsumm.response.candsummary[num]['@attributes'].spent,
      candsumm.response.candsummary[num]['@attributes'].debt,
      candsumm.response.candsummary[num]['@attributes'].source
    ]);
  }
  array3.push(cid_name[1], summs);

  if (counter > numLegs) {
    display_candSum();
  }
}
// End Summary Function

function filter_selection(evt) {
  selected = (evt.target.value);
  if (cid_name.length === 0) {
    return;
  }
  for (x in cid_name) {
    if (selected === cid_name[x][1] + ' ' + cid_name[x][2]) {
      console.log('hi')
      getContr(cid_name[x]);
      getContrByIndustry(cid_name[x]);
    }
  }
}
$('.map').usmap({
  click: function (event, data) {
    $('#clicked-state');
    $('.options').remove();
    $('.contr_list').remove();
    const CID = getData(data.name);
    cid_name = [];
    counter = 0;
    CID.then((result) => {
      for (num in result) {
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        party = result[num]['@attributes'].party;
        cid_name.push([id, leg_name, party]);
      }
      for (num in cid_name) {
        getContr(cid_name[num]);
        getContrByIndustry(cid_name[num]);
        // getSummary(cid_name[num]);
      }
    });
  }
});
function drop_down(leg_names) {
  const options = leg_names
    .map(
      (name) => `
  <option class= options>
      ${name[0]} ${name[1]}
  </option>
`
    )
    .join('');
  l_select.innerHTML += options;
}
function display_IndividualContr() {
  const html = org_total
    .map(
      (place) => `
      <li class=contr_list>
          <span class= "name">${place[0]} donated $${place[1]}</span> <br>
      </li>
  `
    )
    .join('');
  tc_results.innerHTML = html;
}
function display_IndustryContr() {
  const html2 = ind_Total
    .map(
      (place) => `
      <li class=contr_list>
          <span class= "name">${place[0]} donated $${place[1]}</span> <br>
      </li>
  `
    )
    .join('');
  ic_results.innerHTML = html2;
}
// function display_candSum() {
//   const html3 = summs
//     .map(
//       (place) => `
//       <li class=contr_list>
//           <span class= "name">${place[0]} donated $${place[1]}</span> <br>
//       </li>
//   `
//     )
//     .join('');
//   cs_results.innerHTML = html3;
// }

const selection = document.querySelector('.l_select');

selection.addEventListener('change', (event) => {
  filter_selection(event);
});

















// function filter_menu() {
//   $checked = "";
//   // let checked_filters = document.getElementsByName('f_input');
//   for (x = 0; x < 5; x++) {
//     checked_filters = document.filter_options.f_input[x].checked;
//     if (checked_filters) {
//       $checked += (document.filter_options.f_input[x].value);
//     }
//   }
//   console.log($checked)

// }

// filter_button.addEventListener('click', async() => {
//   filter_menu();
// }); 
//  () => {
//   ;
// });

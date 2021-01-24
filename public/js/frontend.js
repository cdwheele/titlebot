const titles = [];
const title_elem = document.getElementById('title');

title_elem.addEventListener('change', addTitle);

function addTitle(title_elem){
  const title = title_elem.target.value;
  titles.append(title);
  console.log(titles);
}

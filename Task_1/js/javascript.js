const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");

const studentNodes = listNode.querySelectorAll("student")

students = [];

studentNodes.forEach((item) => {
    const nameNode = item.querySelector("name");
    const firstNode = nameNode.querySelector("first");
    const secondNode = nameNode.querySelector("second");
    const ageNode = item.querySelector("age");
    const profNode = item.querySelector("prof");
    const langAttr = nameNode.getAttribute('lang');
    students.push({
        name: firstNode.textContent + " " + secondNode.textContent,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr
    });
});

result = {list: students}

console.log(result);
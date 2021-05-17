import { v4 as uuidv4 } from "uuid";
const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

export function insertEmployee(data) {
  let employees = getAllEmployees();
  data["employeeId"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(data) {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex(
    (x) => x.employeeId === data.employeeId
  );
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  let employees = getAllEmployees();
  employees = employees.filter((x) => x.employeeId !== id);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  // if (localStorage.getItem(KEYS.employeeId) == null)
  //   localStorage.setItem(KEYS.employeeId, "0");
  // var id = parseInt(localStorage.getItem(KEYS.employeeId));
  // localStorage.setItem(KEYS.employeeId, (++id).toString());
  return uuidv4();
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  //map departmentID to department title
  // let departments = getDepartmentCollection();
  // return employees.map((x) => ({
  //   ...x,
  //   department: departments[x.departmentId - 1].title,
  // }));
  return employees;
}

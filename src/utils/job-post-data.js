export const departments = [
  {code: 'd1', title: 'Science & Technology'},
  {code: 'd2', title: 'Planing & Development'},
  {code: 'd3', title: 'Law'},
  {code: 'd4', title: 'Higher Education'},
  {code: 'd5', title: 'IT Board'},
  {code: 'd6', title: 'Housing'},
  {code: 'd7', title: 'Health'},
  {code: 'd8', title: 'Food'},
  {code: 'd9', title: 'Finance'},
  {code: 'd10', title: 'Environment'}
]
export const getDepartment = (code) => {
  return departments.filter(d => d.code === code)[0].title
}
export const categories = [
  {code: 'c1', title: 'Administrative'},
  {code: 'c2', title: 'Banking'},
  {code: 'c3', title: 'Education'},
  {code: 'c4', title: 'Engineering'},
  {code: 'c5', title: 'Finance/Accounting'},
  {code: 'c6', title: 'General'},
  {code: 'c7', title: 'Health'},
  {code: 'c8', title: 'IT'}
]
export const getCategory = (code) => {
  return categories.filter(c => c.code === code)[0].title
}
export const types = [
  {code: 't1', title: 'Full Time'},
  {code: 't2', title: 'Part Time'},
  {code: 't3', title: 'Project Based'},
]
export const getType = code => {
  return types.filter(t => t.code === code)[0].title
}

export const qualifications = [
  {code: 'q1', title: 'Matriculation'},
  {code: 'q2', title: 'FA/FSC'},
  {code: 'q3', title: 'Bachelor (4 Year) (Arts/Others)'},
  {code: 'q4', title: 'Bachelor (4 Year) (Computer Science)'},
  {code: 'q5', title: 'Bachelor (4 Year) (Information Technology)'},
  {code: 'q6', title: 'Bachelor (4 Year) (Electrical Engineering Science)'},
  {code: 'q7', title: 'Master (Arts/Others)'},
  {code: 'q8', title: 'Master (Computer Science)'},
  {code: 'q9', title: 'Master (Information Technology)'},
  {code: 'q10', title: 'Master (Electrical Engineering Science)'},
  {code: 'q11', title: 'Phd (Arts/Others)'},
  {code: 'q12', title: 'Phd (Computer Science)'},
  {code: 'q13', title: 'Phd (Information Technology)'},
  {code: 'q14', title: 'Phd (Electrical Engineering Science)'},
]
export const getQualification = code => {
  return qualifications.filter(q => q.code === code)[0].title
}
export const experience = [
  {code: 'e1', title: '1+ Year'},
  {code: 'e2', title: '2+ Year'},
  {code: 'e3', title: '3+ Year'},
  {code: 'e4', title: '4+ Year'},
  {code: 'e5', title: '5+ Year'},
  {code: 'e6', title: '6+ Year'},
]
export const getExperience = code => {
  return experience.filter(e => e.code === code)[0].title
}
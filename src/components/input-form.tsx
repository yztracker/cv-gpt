import React, { useState } from 'react';
import { RESUME_DATA } from "@/data/resume-data";

// 假设的履历数据结构和类型定义
const INITIAL_RESUME_DATA = RESUME_DATA;

interface ISocial {
    name: string;
    url: string;
    icon: string; // 假设icon是字符串类型，根据实际情况可能需要调整
  }
  
  interface IContact {
    email: string;
    tel: string;
    social: ISocial[];
  }
  
  interface IEducation {
    school: string;
    degree: string;
    start: string;
    end: string;
  }
  
  interface IWork {
    company: string;
    link: string;
    badges: string[];
    title: string;
    logo: string; // 假设logo是字符串类型
    start: string;
    end: string;
    description: string;
  }
  
  interface IProjectLink {
    label: string;
    href: string;
  }
  
  interface IProject {
    title: string;
    techStack: string[];
    description: string;
    logo: string; // 假设logo是字符串类型
    link: IProjectLink;
  }
  
  interface IResumeData {
    name: string;
    initials: string;
    location: string;
    locationLink: string;
    about: string;
    summary: string;
    avatarUrl: string;
    personalWebsiteUrl: string;
    contact: IContact;
    education: IEducation[];
    work: IWork[];
    skills: string[];
    projects: IProject[];
  }
  
const ResumeForm = ({resumeData, setResumeData}) => {
//   const [resumeData, setResumeData] = useState<IResumeData>(INITIAL_RESUME_DATA);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setResumeData({ ...resumeData, [field]: e.target.value });
  };

  // 处理数组类型字段（如工作经历）的添加和删除
  // const handleArrayFieldChange = (e: React.ChangeEvent<HTMLInputElement>, arrayField: string, index: number, subField: string) => {
  //   const newArray = [...(resumeData[arrayField] as any)];
  //   newArray[index][subField] = e.target.value;
  //   setResumeData({ ...resumeData, [arrayField]: newArray });
  // };

  // const handleArrayFieldChange = (e: React.ChangeEvent<HTMLInputElement>, arrayField: string, index: number, subField?: string) => {
  //   const newArray = [...(resumeData[arrayField] as any)];
  
  //   // 检查是否处理的是对象数组（例如 'work' 或 'education'）或字符串数组（例如 'skills'）
  //   if (subField) {
  //     // 对象数组: 更新指定的子字段
  //     newArray[index][subField] = e.target.value;
  //   } else {
  //     // 字符串数组: 直接更新数组项
  //     newArray[index] = e.target.value;
  //   }
  
  //   setResumeData({ ...resumeData, [arrayField]: newArray });
  // };

  const handleArrayFieldChange = (e: React.ChangeEvent<HTMLInputElement>, arrayField: string, index: number, subField: string) => {
    const newArray = [...(resumeData[arrayField] as any)];
  
    // 处理嵌套对象字段，例如 'link.href'
    const fieldParts = subField.split('.');
    if (fieldParts.length > 1) {
      // 确保嵌套对象存在
      newArray[index][fieldParts[0]] = newArray[index][fieldParts[0]] || {};
      newArray[index][fieldParts[0]][fieldParts[1]] = e.target.value;
    } else {
      newArray[index][subField] = e.target.value;
    }
  
    setResumeData({ ...resumeData, [arrayField]: newArray });
  };
  

  const addArrayFieldItem = (arrayField: string, newItem: any) => {
    const newArray = [...(resumeData[arrayField] as any), newItem];
    setResumeData({ ...resumeData, [arrayField]: newArray });
  };

  const removeArrayFieldItem = (arrayField: string, index: number) => {
    const newArray = [...(resumeData[arrayField] as any)];
    newArray.splice(index, 1);
    setResumeData({ ...resumeData, [arrayField]: newArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(resumeData);
    // 提交更新逻辑
  };

  const handleNestedArrayFieldChange = (e, mainArrayField, mainIndex, nestedArrayField, nestedIndex) => {
    const updatedMainArray = [...resumeData[mainArrayField]];
    updatedMainArray[mainIndex][nestedArrayField][nestedIndex] = e.target.value;
    setResumeData({ ...resumeData, [mainArrayField]: updatedMainArray });
  };
  
  const removeNestedArrayFieldItem = (mainArrayField, mainIndex, nestedArrayField, nestedIndex) => {
    const updatedMainArray = [...resumeData[mainArrayField]];
    updatedMainArray[mainIndex][nestedArrayField].splice(nestedIndex, 1);
    setResumeData({ ...resumeData, [mainArrayField]: updatedMainArray });
  };
  
  const addNestedArrayFieldItem = (mainArrayField, mainIndex, nestedArrayField, newItem) => {
    const updatedMainArray = [...resumeData[mainArrayField]];
    updatedMainArray[mainIndex][nestedArrayField] = [...updatedMainArray[mainIndex][nestedArrayField], newItem];
    setResumeData({ ...resumeData, [mainArrayField]: updatedMainArray });
  };
  
  return (
<form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6 bg-white shadow-lg rounded-lg">
  {/* 基本字段 */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Name:
    </label>
    <input
      type="text"
      value={resumeData.name}
      onChange={(e) => handleInputChange(e, 'name')}
      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  {/* ...其他基本字段 */}

  {/* 数组字段（如工作经历） */}
  {resumeData.work.map((workItem, index) => (
  <div key={index} className="border-b border-gray-200 mb-4 pb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Company:
      </label>
      <input
        type="text"
        value={workItem.company}
        onChange={(e) => handleArrayFieldChange(e, 'work', index, 'company')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    {/* 添加其他workItem的字段 */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Title:
      </label>
      <input
        type="text"
        value={workItem.title}
        onChange={(e) => handleArrayFieldChange(e, 'work', index, 'title')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    {/* 其他字段 */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description:
      </label>
      <textarea
        value={workItem.description}
        onChange={(e) => handleArrayFieldChange(e, 'work', index, 'description')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Start Year:
      </label>
      <input
        type="text"
        value={workItem.start}
        onChange={(e) => handleArrayFieldChange(e, 'work', index, 'start')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        End Year:
      </label>
      <input
        type="text"
        value={workItem.end}
        onChange={(e) => handleArrayFieldChange(e, 'work', index, 'end')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <button
      type="button"
      onClick={() => removeArrayFieldItem('work', index)}
      className="text-red-500 hover:text-red-700 text-sm"
    >
      Remove
    </button>
  </div>
))}
<button
  type="button"
  onClick={() => addArrayFieldItem('work', { company: '', title: '', description: '', start: '', end: '' })}
  className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Add Work Experience
</button>

{resumeData.education.map((educationItem, index) => (
  <div key={index} className="border-b border-gray-200 mb-4 pb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        School:
      </label>
      <input
        type="text"
        value={educationItem.school}
        onChange={(e) => handleArrayFieldChange(e, 'education', index, 'school')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    {/* 其他educationItem字段 */}
    <button
      type="button"
      onClick={() => removeArrayFieldItem('education', index)}
      className="text-red-500 hover:text-red-700 text-sm"
    >
      Remove Education
    </button>
  </div>
))}
<button
  type="button"
  onClick={() => addArrayFieldItem('education', { school: '', degree: '', start: '', end: '' })}
  className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Add Education
</button>
<div className="border-b border-gray-200 mb-4 pb-4">
  {resumeData.skills.map((skill, index) => (
    <div key={index} className="mb-4 flex items-center">
      <input
        type="text"
        value={skill}
        onChange={(e) => handleArrayFieldChange(e, 'skills', index, '')}
        className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
      />
      <button
        type="button"
        onClick={() => removeArrayFieldItem('skills', index)}
        className="ml-2 text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addArrayFieldItem('skills', '')}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Add Skill
  </button>
</div>
{resumeData.projects.map((projectItem, index) => (
  <div key={index} className="border-b border-gray-200 mb-4 pb-4">
    {/* Project Title */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Project Title:
      </label>
      <input
        type="text"
        value={projectItem.title}
        onChange={(e) => handleArrayFieldChange(e, 'projects', index, 'title')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    {/* Project Description */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description:
      </label>
      <textarea
        value={projectItem.description}
        onChange={(e) => handleArrayFieldChange(e, 'projects', index, 'description')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    {/* Project Link */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Link URL:
      </label>
      <input
        type="text"
        value={projectItem.link ? projectItem.link.href : ''}
        onChange={(e) => handleArrayFieldChange(e, 'projects', index, 'link.href')}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    {projectItem.techStack.map((tech, techIndex) => (
        <div key={techIndex} className="flex items-center mb-2">
          <input
            type="text"
            value={tech}
            onChange={(e) => handleNestedArrayFieldChange(e, 'projects', index, 'techStack', techIndex)}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
          />
          <button
            type="button"
            onClick={() => removeNestedArrayFieldItem('projects', index, 'techStack', techIndex)}
            className="ml-2 text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

    {/* Other fields like techStack, logo can be added similarly */}

    <button
      type="button"
      onClick={() => removeArrayFieldItem('projects', index)}
      className="text-red-500 hover:text-red-700 text-sm"
    >
      Remove Project
    </button>
  </div>
))}
<button
  type="button"
  onClick={() => addArrayFieldItem('projects', { title: '', description: '', techStack: [], logo: '', link: { href: '' } })}
  className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Add Project
</button>

  {/* ...同样的方式应用到 education、skills、projects 等部分 */}

  <button
    type="submit"
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Submit
  </button>
</form>
  );
};

export default ResumeForm;

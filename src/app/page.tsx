"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { EditorState } from 'lexical';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import  ResumeForm  from '@/components/input-form';
interface IResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
}
interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
}


const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange }) => {


  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    onChange(e.currentTarget.textContent || '');
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation(); // 防止事件冒泡到<a>标签
  };

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onClick={handleClick} // 添加点击事件监听器
    >
      {value}
    </span>
  );
};


export default function Page() {

  const [editableData, setEditableData] = useState<IResumeData>({ ...RESUME_DATA });

  const updateField = (field: keyof IResumeData, value: string) => {
    setEditableData({ ...editableData, [field]: value });
  };

  const [resumeData, setResumeData] = useState<IResumeData>({ ...RESUME_DATA });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  console.log(resumeData)
  // 更新履历数据的函数
  const updateResumeData = (field: keyof IResumeData, value: string) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">

      
<div>
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </button>
    </div>


      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
          <h1
          className="text-2xl font-bold"
          contentEditable={isEditMode}
          onBlur={(e) => updateResumeData('name', e.target.textContent || '')}
        >
          {resumeData.name}
        </h1>

            <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground"
                      contentEditable={isEditMode}
                      onBlur={(e) => updateResumeData('about', e.target.textContent || '')}
            
            >
              {resumeData.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={resumeData.locationLink}
                target="_blank"
              >
                <GlobeIcon className="h-3 w-3" />
                {resumeData.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {resumeData.contact.email ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${resumeData.contact.email}`}>
                    <MailIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {resumeData.contact.tel ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`tel:${resumeData.contact.tel}`}>
                    <PhoneIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {resumeData.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
              {resumeData.contact.email ? (
                <a href={`mailto:${resumeData.contact.email}`}>
                  <span className="underline">{resumeData.contact.email}</span>
                </a>
              ) : null}
              {resumeData.contact.tel ? (
                <a href={`tel:${resumeData.contact.tel}`}>
                  <span className="underline">{resumeData.contact.tel}</span>
                </a>
              ) : null}
            </div>
          </div>

          <Avatar className="h-28 w-28">
            <AvatarImage alt={resumeData.name} src={resumeData.avatarUrl} />
            <AvatarFallback>{resumeData.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground"
              contentEditable={isEditMode}
              onBlur={(e) => updateResumeData('summary', e.target.textContent || '')}
          
          >
            {resumeData.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {resumeData.work.map((work) => {
            return (
              <Card key={work.company}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a className="hover:underline" href={work.link}
                          contentEditable={isEditMode}
                          onBlur={(e) => updateResumeData('company', e.target.textContent || '')}
                      
                      >
                        {work.company}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs"
                            key={badge}
                            contentEditable={isEditMode}
                            onBlur={(e) => updateResumeData('badge', e.target.textContent || '')}
              
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500"
                                  contentEditable={isEditMode}
                                  onBlur={(e) => updateResumeData('start', e.target.textContent || '')}
                    
                    >
                      {work.start} - {work.end}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm leading-none"
                      contentEditable={isEditMode}
                      onBlur={(e) => updateResumeData('title', e.target.textContent || '')}
                  
                  >
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 text-xs"
                              contentEditable={isEditMode}
                              onBlur={(e) => updateResumeData('description', e.target.textContent || '')}
                
                >
                  {work.description}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Education</h2>
          {resumeData.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      {education.school}
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">{education.degree}</CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills.map((skill) => {
              return <Badge key={skill}>{skill}</Badge>;
            })}
          </div>
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {resumeData.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>
      </section>
      <ResumeForm resumeData={resumeData} setResumeData={setResumeData}/>
      <CommandMenu
        links={[
          {
            url: resumeData.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...resumeData.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}

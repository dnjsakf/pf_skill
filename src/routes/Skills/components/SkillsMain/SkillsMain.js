/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Custom Components */
import { BaseTreeView } from '@components/TreeView';

/* Styled Components */
const Container = styled.div`
`;


const items = [
  {
    id: "Home",
    group: "",
    name: "Home",
    label: "홈",
    href: "/home",
    icon: "Image",
    subItems: []
  },
  {
    id: "Skills",
    group: "",
    name: "Skills",
    label: "기술 스택",
    href: "/skills",
    icon: "Code",
    subItems: [
      {
        id: "Skills/ELK",
        group: "Skills",
        name: "ELK",
        label: "ELK 스택",
        href: "/skills/elk",
        icon: "Code"
      },
      {
        id: "Skills/ETL",
        group: "Skills",
        name: "ETL",
        label: "ETL",
        href: "/skills/etl",
        icon: "Code" 
      },
      {
        id: "Skills/Crawler",
        group: "Skills",
        name: "Crawler",
        label: "크롤링",
        href: "/skills/crawler",
        icon: "Code" 
      },
      {
        id: "Skills/CELERY",
        group: "Skills",
        name: "CELERY",
        label: "CELERY",
        href: "/skills/celery",
        icon: "Code",
        subItems: [
          {
            id: "Settings",
            group: "",
            name: "Settings",
            label: "설정",
            href: "/settings",
            icon: "Settings",
            subItems: []
          }
        ]
      },
    ]
  },
  {
    id: "Settings",
    group: "",
    name: "Settings",
    label: "설정",
    href: "/settings",
    icon: "Settings",
    subItems: []
  }
]

/* Main Component */
const SkillsMain = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <Container>
      SkillsMain
      <div>
        <BaseTreeView
          items={ items }
          depth={ 1 }
        />
      </div>
    </Container>
  );
}

/* Main Component Settings */
SkillsMain.propTypes = { }

/* Exports */
export default SkillsMain;
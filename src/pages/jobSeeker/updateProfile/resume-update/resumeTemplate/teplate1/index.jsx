// import { DATE_FORMAT, YEAR_FORMAT } from "@utils/constants/constants";
// import { generateFileUrl } from "@utils/generateFileUrl";
// import dayjs from "dayjs";
import React from "react";
// import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useSelector } from "react-redux";
import "./style.css";
function ResumeTemplate() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <div className="container" id="div-to-pdf">
        <div className="header">
          <div className="full-name">
            <h4>CURICULUM VITAE (CV)</h4>
            <div>
              <span className="first-name">{currentUser.name}</span>
            </div>
            {/* <h4>Bondhere District</h4> */}
            {/* <h4>Mogadishu-Somalia</h4> */}
          </div>
          <div className="contact-info">
            <span className="phone">Phone : </span>
            <span className="phone-val">{currentUser.countryCode} {currentUser.mobileNumber}</span>
            <br />
            <span className="email">Email : </span>
            <span className="email-val">{currentUser.email}</span>
          </div>
        </div>

        <div className="about">
          <p className="position">PROFILE SUMMARY</p>
          <span className="desc">
          {currentUser.profile.description}
            Financial professional with extensive experience in managing
            financial reporting and control functions in governmental and
            non-governmental institutions. Extensive experience in formulating
            and managing budget, developing financial systems, creating
            financial projections, coordinating and allocating financial
            resources, revenue and expenditure control. Advanced knowledge of
            computers and associated software applications including Excel,
            Power Point, SPSS, Peachtree and QuickBooks. Holder of a Masters of
            Business Administration- Finance and Accounting.
          </span>
          {/* <br />
          <br />
          <span className="desc">
            I am currently working as a project financial management specialist
            on World Bank Funded Projects providing financial consultancy to the
            SCALED-UP, DRIVE – Ministry of finance, CIP project - Office of the
            Prime Minister and Preparation of Proposed Eastern Africa Regional
            Digital Integration Project - Ministry of Communication and
            Technology, Federal Government of Somalia. I also worked as FMS
            completed SCORE project, ministry of Finance, SOPTAP project
            ministry of petroleum and Mineral Resources, Federal Government of
            Somalia.
          </span>
          <br />
          <br />
          <span className="desc">
            Over the years, I have proved myself as a determined and dedicated
            professional who strives to progressively advance his career to add
            value to his position and ultimately to the overall organization.
          </span> */}
        </div>

        {/* <div className="knowledge">
          <p className="title">KNOWLEDGE AND EXPERTISE</p>
          <ul>
            <li>Budgeting & Forecasting</li>
            <li>Cash & Treasury Management</li>
            <li>Reconciliation & Financial Reporting</li>
            <li>Training & Development</li>
            <li>Revenue & Expenditure Control</li>
            <li>Financial Resources Allocation</li>
            <li>Procurement & Project Management</li>
            <li>Strategic Financial Planning & Analysis</li>
            <li>Presentation and Communication</li>
          </ul>
        </div> */}

        <div className="education">
          <p className="title">Education</p>
          <ul>
            <li>
              { currentUser.profile.highestEducation.title }
            </li>
            {/* <li>
              2012 - 2013 Postgraduate diploma of Entrepreneurship Development
              at Uganda Institute of Social Work; and Community Development in
              Kampala, Uganda
            </li>
            <li>
              2009 – 2011 Bachelor of Science in Accounting- SIMAD University,
              in Mogadishu, Somalia
            </li> */}
          </ul>
        </div>

        {/* <div className="qualification">
          <p className="title">additional qualification</p>
          <ul>
            <li>
              Certificate on World Bank’s Procurement Framework Workshop – Kenya
              Institute of Supplies Management (KISM) in partnership with World
              Bank Group, 28th May – 10 June 2022, Mombasa, Kenya.
            </li>
            <li>
              Certificate in International Public Sector Accounting Standards
              (IPSAS).
            </li>
            <li>
              Systematic Tracking of Exchanges in Procurement (STEP) Training
              facilitated by the World Bank.
            </li>
            <li>
              Certificate in Contract Management Delivered as Massive Open
              Online Course partner with World Bank.
            </li>
            <li>
              Certificate in Financial Management for NGOs - Makerere Business
              School, Uganda
            </li>
            <li>
              Certificate in Proposal Writing and Report Writing, from
              Leadership Advanced Institute, Uganda
            </li>
            <li>
              Certificate in Research Methodology and data collection- Uganda
              Institute of Social Work & Community Development.
            </li>
          </ul>
        </div> */}

        <div className="summary">
          <p className="title">employment summary</p>
          <span className="title">
          {currentUser.workExperiences}
          </span>
          {/* <p className="responsibility">Key responsibilities</p>
          <ul>
            <li>
              Advise the senior management of the FGS Ministry of Finance (MoF)
              on all procurement aspects of the Project
            </li>
            <li>
              Responsible for coordination and implementation of all procurement
              activities of SCALED-UP project.
            </li>
            <li>
              Work with other specialist in the SCALED-UP Project Implementation
              Unit to perform all necessary procurement under SCALED-UP for the
              period of the assignment Set up systems for procurement planning,
              implementation, monitoring and documentation for the projects as
              per required standards;
            </li>
            <li>
              In consultation with the Project Coordinator and the projects’
              Technical Teams prepare realistic, consolidated, updated annual
              procurement plans which are in harmony with the work plans and
              available funds;
            </li>
            <li>
              Provide guidance in the preparation of detailed procurement plans
              in which key milestones are indicated and ensure the relevant
              columns are filled in as and when each stage is accomplished, and
              establish a simplified tracking system for monitoring procurement
              activities;
            </li>
            <li>
              Provide advice to project technical teams and beneficiaries at all
              stages of procurement to ensure that the projects procurement
              activities are carried out in accordance with the World Bank
              Guidelines/Regulations;
            </li>
            <li>
              Prepare Specific Procurement Notices (SPN) for the international
              and national competitive bidding procedures for procurement of
              goods as well as selection of consultants in accordance with the
              World Bank Guidelines and procedures for their posting in UNDB
              online and local newspapers, as necessary;
            </li>
            <li>
              Provide professional guidance and advice on procurement documents
              filing for safe keeping of procurement records and propose and
              implement mechanisms for ensuring that important procurement
              documents are filed and retained in the established procurement
              files;
            </li>
            <li>
              Provide support in contract management, especially in monitoring
              contract execution, ensuring timely delivery of goods and
              consultants reports and other deliverables, and ensure compliance
              to provisions in contracts by all contracting parties;
            </li>
          </ul> */}
        </div>
        {/* <div className="keys">
          <span className="title">
            Jan 2020 – Nov 2021: Acting PIU Coordinator – SCALED-UP Project
            funded by World Bank and implanting by Project implementation unit
            (PIU) Ministry of Finance, FGS
          </span>
          <p className="responsibility">Key responsibilities</p>
          <p>
            Under the strategic leadership as the Head of Unit, the specific
            duties of the PIU coordinator will include:
          </p>
          <ul>
            <li>
              Prepare and follow through a phased programme of action to ensure
              coordination of efforts in implementing the SCALED-UP program for
              the government.
            </li>
            <li>
              Develop and strengthen collaboration with government focal points,
              the project steering committee (PSC), development partners and
              other stakeholders to facilitate their understanding and support
              to the SCALED-UP program.
            </li>
            <li>
              Provide advice and support in the establishment and staffing of
              the PIU.
            </li>
            <li>Supervise work of Subject Matter Experts (SMEs).</li>
            <li>
              As required, embark on change management and communication
              campaigns.
            </li>
            <li>
              Coordinate the preparation, monitoring, and reporting on the
              execution of the overall procurement plan of the project for the
              procurement of goods, consulting, and non-consulting services
              consistent with procurement guidelines of the funding Development
              Partners and the specific provisions of the Grant Agreement.
            </li>
          </ul>
        </div> */}

        {/* <div className="keys">
          <span className="title">
            March 2016 – to date: Financial Management Specialist –
            Multi-project funded by world bank and implementing by Federal
            Government of Somalia
          </span>
          <p className="responsibility">Project include :</p>
          <ul>
            <li>
              <strong>Nov. 2023 – Present:</strong> Preparation of Proposed
              Eastern Africa Regional Digital Integration Project cost
              <strong>($2.3 M)</strong> - implementing by Project Implementation
              Unit, Ministry of Communication and Technology.
            </li>
            <li>
              <strong>Sep – Present :</strong> Somalia Capacity Injection
              Project cost <strong>($17.40 M)</strong>, implementing by Project
              Implementation Unit, Office of the Prime Minister
            </li>
            <li>
              <strong>2022 – Present :</strong> The De-risking, Inclusion and
              Value Enhancement of Pastoral Economies in the Horn of Africa
              (DRIVE) Project cost <strong>($40 M)</strong>, implementing by
              Project Implementation Unit, Ministry of Finance
            </li>
            <li>
              <strong>2019 – Present :</strong> Somalia Capacity Advancement,
              Livelihoods and Entrepreneurship, through Digital
              Uplift Project project cost <strong>($ 101 M)</strong>
              , implementing by Project Implementation Unit, Ministry of Finance
            </li>
            <li>
              <strong>2018 - 2020 :</strong> Somali Petroleum Technical
              Assistance Project, project cost
              <strong>($ 0.5 M)</strong>, implemented by Project Implementation
              Unit, ministry of Petroleum and Mineral Resources
            </li>
            <li>
              2016 – 2020: Somali Core Economic Institutions and Opportunities
              Program (SCORE) project cost <strong>($12.5M)</strong>,
              implemented by Project Implementation Unit, Ministry of Finance.
            </li>
          </ul>
        </div> */}

        {/* <div className="duties">
          <span className="title">
            The specific duties of the FM Specialist were remained same and
            include :
          </span>
          <ul>
            <li>
              Carry out financial management training needs analysis across the
              implementing MDAs and develop a capacity development and training
              plan.
            </li>
            <li>
              Carry out periodic financial management capacity building and
              trainings for the implementing MDAs.
            </li>
            <li>
              Maintain all accounting records in line with approved accounting
              standards and in line with the World Bank’s and Government’s
              regulations;
            </li>
            <li>
              Render periodic reports, (i.e., monthly/quarterly/annually) in the
              formats approved by the World Bank and FGS and in line with the
              project documents and financing agreement.
            </li>
            <li>
              Ensure that disbursements are made in accordance with approved
              annual budgets and work plans together with the Project
              management.
            </li>
            <li>
              Identify key emerging gaps and fiduciary risks that inform the
              need to revise the EAFS manual and PIM.
            </li>
          </ul>
        </div>

        <div className="financial">
          <span className="title">
            Jul 2013- 2015: Financial Analyst, Office of the Accountant General,
            Federal Government of Somalia, Ministry of Finance
          </span>
          <ul>
            <li>
              Assisted and facilitated in the implementation of the 2013
              financial management system;
            </li>
            <li>
              Working closely with the Budget Director to ensure funds of the
              government budget are allocated towards progressive and practical
              projects. Setting benchmarks for how those proposals should be
              presented;
            </li>
            <li>
              Helped in creating monitoring & evaluation and overseeing the
              implementation of project proposals in the Accountant General’s
              office;
            </li>
            <li>
              Assisted the Accountant General in preparing financial statements;
              and ledger accounts;
            </li>
            <li>
              Coordinated activities between the Office of the Accountant
              General, Director of Budget and the Director General’s office.
            </li>
          </ul>
        </div>

        <div className="lecturer">
          <span className="title">
            Sept 2014 – May 2016: Part time Lecturer – Finance and Accounting
            Faculty - Salam University
          </span>
          <ul>
            <li>
              Lecturing on Financial management systems and accounting to
              undergraduate and research degree students;
            </li>
            <li>
              Reviewing and incorporating new approaches to preparation, design
              and delivery of teaching, learning and assessment.
            </li>
            <li>
              Teaching professional accountants as part of their continual
              professional development;
            </li>
            <li>Preparing examinations and marking exams;</li>
            <li>
              Supervising the work of students during their final year projects;
            </li>
            <li>
              Provide students with advice/support related to engagement with
              modules;
            </li>
            <li>Act as a mentor for students.</li>
          </ul>
        </div>

        <div className="accountant">
          <span className="title">
            Feb 2012–Jan 2013: Chief Accountant- Nabuko General Trading partner
            with Export Training Group – Mogadishu
          </span>
          <ul>
            <li>Recorded accounting transactions.</li>
            <li>
              Prepared and examined accounting records, financial statements and
              other financial reports and ensured accuracy, comprehensiveness
              and conformance to reporting and procedural standards.
            </li>
            <li>
              Planned for cash flow requirements and submitted updated cash
              forecast and monthly cash requests to the project accountant on a
              timely basis.
            </li>
            <li>
              Processed and made payments as provided in the approved budget.
            </li>
            <li>Ensured timely recovery of all advances.</li>
            <li>
              Assisted with facilitation of internal and external audit
              procedures as required.
            </li>
          </ul>
        </div>

        <div className="training">
          <span className="title">Training and Other Skills Attained</span>
          <ul>
            <li>
              Attended Capacity building training facilitated by Oxfam in
              partnership with New Horizon
            </li>
            <li>
              Participated in three-day training on SMS feedback system,
              Communication skills & Grant Management Model (GMM) by Somali
              Stability Fund (SSF).
            </li>
            <li>
              Attended four-day workshop accounting software QuickBooks & Tally
              by Hantidhawr Accounting Service
            </li>
            <li>
              Participated in training on Grant Management Model (GMM) by Somali
              Stability Fund (SSF)
            </li>
            <li>
              Capacity building training workshop, held at world vision
              organization- Kampala.
            </li>
            <li>
              Research methodology and advanced data analysis packages training,
              held at Leadership Advanced Institute
            </li>
            <li>First Aid training, held at Red Cross.</li>
            <li>Certificate of computer skills, word, excel and Database.</li>
          </ul>
        </div>

        <div className="publication">
          <span className="title">PUBLICATIONS :</span>
          <p>
            Abdimajid Omar Abu-Hadi, Abdel Hafiez Ali & Ali Yassin Sheikh Ali
            (2013) “The Accessibility of Microfinance for Small Businesses in
            Mogadishu, Somalia”, International Journal of Humanities and Social
            Science, Vol. 3 No. 11, pp.172-180-
          </p>
        </div>

        <div className="referese">
          <span className="title">referees</span>
          <span> – Available upon request</span>
        </div> */}
      </div>
    </>
  );
}

export default ResumeTemplate;

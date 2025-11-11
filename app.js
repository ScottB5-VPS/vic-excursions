document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const form = document.getElementById('generator-form');
  const downloads = document.getElementById('downloads');
  const fileList = document.getElementById('fileList');
  const backBtn = document.getElementById('backBtn');

  // Get Started button functionality
  const getStartedBtn = document.getElementById('getStartedBtn');
  if (getStartedBtn && landing && form) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Get Started clicked - transitioning to form'); // Debug log
      landing.style.display = 'none'; // Force hide with inline style
      form.style.display = 'block'; // Force show with inline style
      form.classList.remove('hidden');
    });
  } else {
    console.error('Elements not found:', { getStartedBtn, landing, form });
  }

  function makeBlobAndDownload(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Document mapping from the documents directory
  const documentLibrary = {
    'risk-assessment-local': {
      filename: 'excursions-evidence-of-risk-assessment-local.pdf',
      title: 'Risk Assessment for Local Excursions',
      type: 'paper'
    },
    'risk-register': {
      filename: 'excursions-risk-register-1516.docx',
      title: 'Excursions Risk Register',
      type: 'paper'
    },
    'parent-consent': {
      filename: 'excursions-parent-consent-1513.docx',
      title: 'Parent Consent Form',
      type: 'paper'
    },
    'pre-activity-check': {
      filename: 'excursions-pre-activity-check-1514.docx',
      title: 'Pre-Activity Check',
      type: 'paper'
    },
    'annual-consent': {
      filename: 'local-excursion-annual-consent-form.docx',
      title: 'Annual Consent Form',
      type: 'paper'
    },
    'notification-samples': {
      filename: 'local-excursion-notification-samples.docx',
      title: 'Notification Samples',
      type: 'paper'
    },
    'swimming-checklist': {
      filename: 'camps-excursions-swimming-water-based-activity-checklist-1310.docx',
      title: 'Swimming and Water Activity Checklist',
      type: 'paper'
    },
    'swimming-approval': {
      filename: 'camps-excursions-swimming-water-based-activity-principal-approval-form-1311.docx',
      title: 'Principal Approval Form',
      type: 'paper'
    },
    'swimming-skills': {
      filename: 'student-skills-swimming-and-water-based-activities-template-2573.docx',
      title: 'Student Swimming Skills Template',
      type: 'paper'
    },
    'medical-info-camps': {
      filename: 'medical-information-form-camps-overseas-excursions-1980.docx',
      title: 'Medical Information Form (Camps/Overseas)',
      type: 'paper'
    },
    'medical-info-excursions': {
      filename: 'medical-information-form-for-excursions-1981.docx',
      title: 'Medical Information Form (Excursions)',
      type: 'paper'
    },
    'health-support-plan': {
      filename: 'student-health-support-plan-2478.docx',
      title: 'Student Health Support Plan',
      type: 'paper'
    },
    'safety-guidelines': {
      filename: 'safety-guidelines-form-risk-analysis-tools-1079.doc',
      title: 'Safety Guidelines & Risk Analysis',
      type: 'paper'
    },
    'excursion-clothing': {
      filename: 'excursion_clothing.doc',
      title: 'Excursion Clothing Guidelines',
      type: 'paper'
    },
    'communications': {
      filename: 'excursion_communications.docx',
      title: 'Communications Plan',
      type: 'paper'
    },
    'emergency-procedures': {
      filename: 'excursion_emergency.docx',
      title: 'Emergency Procedures',
      type: 'paper'
    },
    'documentation-summary': {
      filename: 'summary-of-excursion-documentation-2490.docx',
      title: 'Summary of Documentation Requirements',
      type: 'paper'
    }
  };

  function generateExcursionRequirements(formData) {
    const eventDescription = formData.get('eventDescription') || '';
    const type = formData.get('type') || '';
    const duration = formData.get('duration') || '';
    const timeOfDay = formData.get('timeOfDay') || '';
    const students = formData.get('students') || '';
    const activities = formData.getAll('activities');
    const transport = formData.getAll('transport');
    const location = formData.get('location') || '';
    const externalProviders = formData.get('externalProviders') || '';

    const paperForms = [];
    const onlineForms = [];

    // Always required documents
    paperForms.push(documentLibrary['risk-assessment-local']);
    paperForms.push(documentLibrary['parent-consent']);
    paperForms.push(documentLibrary['pre-activity-check']);

    // Type-specific requirements
    if (type === 'excursion' && duration === 'half-day') {
      paperForms.push(documentLibrary['annual-consent']);
    }

    if (type === 'camp' || type === 'overnight' || duration.includes('nights')) {
      paperForms.push(documentLibrary['medical-info-camps']);
      paperForms.push(documentLibrary['health-support-plan']);
      onlineForms.push({
        title: 'Travel Request Application (ERA)',
        link: '#',
        description: 'Online application for overnight stays'
      });
    } else {
      paperForms.push(documentLibrary['medical-info-excursions']);
    }

    // Activity-specific requirements
    if (activities.some(act => ['swimming', 'water-based', 'canoeing', 'sailing', 'sea-kayaking', 'scuba-diving', 'snorkelling', 'surfing', 'water-skiing'].includes(act))) {
      paperForms.push(documentLibrary['swimming-checklist']);
      paperForms.push(documentLibrary['swimming-approval']);
      paperForms.push(documentLibrary['swimming-skills']);
      onlineForms.push({
        title: 'Student Activity Locator (SAIL)',
        link: '#',
        description: 'Track student participation in water activities'
      });
    }

    // External providers
    if (externalProviders === 'yes-ep') {
      onlineForms.push({
        title: 'ParkConnect',
        link: '#',
        description: 'External provider verification system'
      });
    }

    // Communication and emergency planning
    paperForms.push(documentLibrary['communications']);
    paperForms.push(documentLibrary['emergency-procedures']);

    // Safety guidelines
    paperForms.push(documentLibrary['safety-guidelines']);

    // Documentation summary
    paperForms.push(documentLibrary['documentation-summary']);

    // Calculate estimated time
    const baseTime = 20;
    let additionalTime = 0;
    
    if (activities.length > 3) additionalTime += 10;
    if (type === 'camp' || duration.includes('nights')) additionalTime += 15;
    if (activities.some(act => ['swimming', 'water-based'].includes(act))) additionalTime += 10;
    if (externalProviders === 'yes-ep') additionalTime += 5;
    
    const totalTime = baseTime + additionalTime;

    return {
      paperForms: paperForms.filter(doc => doc), // Remove any undefined documents
      onlineForms,
      estimatedTime: totalTime,
      summary: {
        type: type || 'Not specified',
        students: students || 'Not specified',
        activities: activities.length ? activities.join(', ') : 'Not specified',
        transport: transport.length ? transport.join(', ') : 'Not specified',
        location: location || 'Not specified',
        externalProviders: externalProviders === 'yes-ep' ? 'I am utilising external providers' : 
                          externalProviders === 'no-ep' ? 'Not using external providers' : 'Not specified'
      }
    };
  }

  function generateRiskAssessment(description, type, duration, activities, transport, location) {
    return `EXCURSION RISK ASSESSMENT

Event Description: ${description}
Type: ${type}
Duration: ${duration}
Location: ${location}
Activities: ${activities.join(', ')}
Transport: ${transport.join(', ')}

RISK EVALUATION MATRIX
[This template provides the framework for identifying and assessing risks]

HIGH PRIORITY RISKS TO ASSESS:
${activities.includes('swimming') ? '• Water safety and drowning prevention\n' : ''}${activities.includes('climbing') ? '• Fall protection and equipment safety\n' : ''}${transport.includes('bus') ? '• Vehicle safety and seatbelt compliance\n' : ''}${location === 'remote' ? '• Emergency access and communication\n' : ''}
• Student supervision ratios
• Weather conditions
• Medical emergencies
• Lost or separated students

REQUIRED ACTIONS:
1. Complete detailed risk assessment for each identified hazard
2. Implement control measures to reduce risks to acceptable levels
3. Ensure all staff understand emergency procedures
4. Verify insurance coverage is adequate
5. Obtain principal approval before proceeding

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  function generatePermissionForm(description, type, duration, timeOfDay, activities, transport) {
    return `STUDENT EXCURSION PERMISSION FORM

TO: Parents/Guardians
RE: ${description || 'School Excursion'}

Excursion Details:
• Type: ${type}
• Duration: ${duration}
• Time: ${timeOfDay}
• Activities: ${activities.join(', ')}
• Transport: ${transport.join(', ')}

This permission form must be returned before your child can participate.

PARENT/GUARDIAN CONSENT:
☐ I give permission for my child to participate in this excursion
☐ I understand the activities and risks involved
☐ My child can swim 50 metres (if water activities selected)
☐ I will provide emergency contact details

Medical Information:
Please list any medical conditions, allergies, or medications:
_________________________________

Emergency Contact (other than parent):
Name: ________________________
Phone: _______________________
Relationship: __________________

Parent/Guardian Signature: _______________  Date: _______

Victoria Department of Education
Generated: ${new Date().toLocaleString()}`;
  }

  function generatePlanningChecklist(type, duration, activities, transport, externalProviders) {
    return `EXCURSION PLANNING CHECKLIST

PRE-EXCURSION (8 weeks before):
☐ Obtain principal approval for excursion proposal
☐ Complete risk assessment documentation
☐ Book venue/activity provider
☐ Arrange transport
☐ Determine staff supervision ratios
☐ Check insurance coverage

DOCUMENTATION (6 weeks before):
☐ Prepare permission forms for parents
☐ Create emergency contact list
☐ Prepare student medical information summary
☐ Brief all supervising staff on procedures

${externalProviders === 'yes-ep' ? 'EXTERNAL PROVIDERS:\n☐ Verify provider qualifications and insurance\n☐ Confirm safety procedures with provider\n☐ Review provider emergency procedures\n\n' : ''}TRANSPORT REQUIREMENTS:
${transport.includes('bus') ? '☐ Confirm bus booking and safety features\n☐ Brief bus driver on route and procedures\n' : ''}${transport.includes('private-vehicle') ? '☐ Verify driver licenses and vehicle registration\n☐ Confirm vehicle insurance coverage\n' : ''}
FINAL PREPARATIONS (1 week before):
☐ Collect all permission forms
☐ Prepare first aid kit and emergency supplies
☐ Confirm weather forecast and backup plans
☐ Brief students on expectations and safety rules
☐ Prepare emergency contact procedures

ON THE DAY:
☐ Take attendance before departure
☐ Ensure all staff have emergency contacts
☐ Verify first aid supplies are available
☐ Confirm all students have appropriate clothing/equipment

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  function generateWaterSafetyPlan() {
    return `WATER SAFETY MANAGEMENT PLAN

SWIMMING COMPETENCY REQUIREMENTS:
• All students must demonstrate ability to swim 50 metres
• Non-swimmers must wear approved flotation devices
• Students with limited swimming ability require closer supervision

SUPERVISION RATIOS:
• Qualified lifeguard must be present during water activities
• Minimum 1:8 staff to student ratio in water
• Additional staff supervision for non-swimmers

EMERGENCY PROCEDURES:
• Emergency action plan must be clearly displayed
• All staff must know location of emergency equipment
• Emergency services contact numbers readily available
• Clear communication signals for emergency evacuation

EQUIPMENT REQUIREMENTS:
• Appropriate flotation devices available for all students
• Emergency rescue equipment accessible
• First aid kit positioned near water activity area

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  function generateCampingPlan() {
    return `CAMPING SAFETY MANAGEMENT PLAN

ACCOMMODATION REQUIREMENTS:
• Separate sleeping areas for male and female students
• Adult supervision in all accommodation areas
• Emergency lighting and exit procedures
• Secure storage for medications and valuables

SUPERVISION ARRANGEMENTS:
• 24-hour adult supervision roster
• Clear boundaries and movement restrictions
• Emergency contact procedures for parents
• Student check-in times and procedures

SAFETY CONSIDERATIONS:
• Fire safety and evacuation procedures
• Food safety and hygiene requirements
• Weather protection and backup accommodation
• Wildlife awareness and protection measures

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  function generateProviderChecklist() {
    return `EXTERNAL PROVIDER VERIFICATION CHECKLIST

PROVIDER CREDENTIALS:
☐ Current business registration and licenses
☐ Public liability insurance (minimum $20 million)
☐ Professional indemnity insurance
☐ Staff qualifications and training certificates

SAFETY MANAGEMENT:
☐ Current safety management system
☐ Risk assessment procedures
☐ Emergency response procedures
☐ Equipment maintenance records

STAFF VERIFICATION:
☐ Working with Children Check for all staff
☐ Police check clearances
☐ First aid qualifications
☐ Activity-specific instructor qualifications

QUALITY ASSURANCE:
☐ Recent client references
☐ Safety incident records
☐ Compliance with industry standards
☐ Regular safety audits conducted

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  function generateTransportPlan() {
    return `TRANSPORT MANAGEMENT PLAN

VEHICLE REQUIREMENTS:
☐ Current registration and roadworthy certificate
☐ Appropriate insurance coverage
☐ Seatbelts for all passengers
☐ Emergency equipment (first aid, fire extinguisher)

DRIVER REQUIREMENTS:
☐ Valid license appropriate for vehicle type
☐ Working with Children Check
☐ Briefed on route and emergency procedures
☐ Contact details provided to school

TRAVEL PROCEDURES:
☐ Student roll call before departure and return
☐ Seating arrangements documented
☐ Emergency contact numbers available
☐ Alternative transport arrangements if needed

Generated: ${new Date().toLocaleString()}
Victoria Department of Education`;
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(form);
    
    // Check if essential fields are completed
    const type = formData.get('type');
    const duration = formData.get('duration');
    
    if (!type || !duration) {
      alert('Please select at least the excursion type and duration to generate requirements.');
      return;
    }

    const requirements = generateExcursionRequirements(formData);
    
    // Update time estimate
    document.getElementById('timeEstimate').textContent = requirements.estimatedTime;
    
    // Populate paper forms
    const paperFormsContainer = document.getElementById('paperForms');
    paperFormsContainer.innerHTML = '';
    requirements.paperForms.forEach(doc => {
      const formCard = document.createElement('div');
      formCard.className = 'form-card';
      formCard.innerHTML = `
        <div class="download-icon">📄</div>
        <div class="form-title">${doc.title}</div>
        <a href="./documents/${doc.filename}" class="form-link" download>Download</a>
      `;
      paperFormsContainer.appendChild(formCard);
    });

    // Populate online forms
    const onlineFormsContainer = document.getElementById('onlineForms');
    onlineFormsContainer.innerHTML = '';
    requirements.onlineForms.forEach(form => {
      const formCard = document.createElement('div');
      formCard.className = 'form-card';
      formCard.innerHTML = `
        <div class="link-icon">🔗</div>
        <div class="form-title">${form.title}</div>
        <a href="${form.link}" class="form-link" target="_blank">Open Form</a>
      `;
      onlineFormsContainer.appendChild(formCard);
    });

    // Populate activity summary
    const summaryContainer = document.getElementById('activitySummary');
    summaryContainer.innerHTML = `
      <div class="summary-item">
        <div class="summary-label">Type:</div>
        <div class="summary-value">${requirements.summary.type}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Number of students:</div>
        <div class="summary-value">${requirements.summary.students}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Activities:</div>
        <div class="summary-value">${requirements.summary.activities}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Transport:</div>
        <div class="summary-value">${requirements.summary.transport}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Location:</div>
        <div class="summary-value">${requirements.summary.location}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">External providers:</div>
        <div class="summary-value">${requirements.summary.externalProviders}</div>
      </div>
    `;

    form.classList.add('hidden');
    downloads.classList.remove('hidden');
  });

  // Event handlers for the results page
  document.getElementById('backBtn').addEventListener('click', () => {
    downloads.classList.add('hidden');
    form.classList.remove('hidden');
  });

  document.getElementById('editBtn').addEventListener('click', () => {
    downloads.classList.add('hidden');
    form.classList.remove('hidden');
  });

  document.getElementById('closeLaterBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to close without completing? Your progress will be lost.')) {
      location.reload();
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    alert('This would proceed to the next step in the excursion planning process.');
  });

  document.getElementById('downloadPDFBtn').addEventListener('click', () => {
    // Generate a comprehensive PDF with all requirements
    const formData = new FormData(form);
    const requirements = generateExcursionRequirements(formData);
    const eventDescription = formData.get('eventDescription') || 'Excursion planning requirements';
    
    const pdfContent = generateComprehensivePDF(requirements, eventDescription);
    makeBlobAndDownload('Excursion_Requirements.pdf', pdfContent, 'application/pdf');
  });

  // Download All button - zips all required documents from the documents/ directory
  document.getElementById('downloadAllBtn').addEventListener('click', async () => {
    const btn = document.getElementById('downloadAllBtn');
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = 'Preparing...';

    if (typeof JSZip === 'undefined') {
      alert('ZIP support library not loaded. Please ensure JSZip is available.');
      btn.disabled = false;
      btn.textContent = originalText;
      return;
    }

    try {
      const formData = new FormData(form);
      const requirements = generateExcursionRequirements(formData);
      const zip = new JSZip();

      // Add paper forms
      for (const doc of requirements.paperForms) {
        try {
          const res = await fetch(`./documents/${doc.filename}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();
          zip.file(doc.filename, blob);
        } catch (err) {
          // If we can't fetch the real file, add a note file instead
          zip.file(`${doc.filename}.missing.txt`, `Could not fetch ${doc.filename}: ${err.message}`);
        }
      }

      // Add a summary text file of requirements
      const summaryText = generateComprehensivePDF(requirements, formData.get('eventDescription') || 'Excursion planning requirements');
      zip.file('Excursion_Requirements.txt', summaryText);

      const content = await zip.generateAsync({ type: 'blob' });
      makeBlobAndDownload('Excursion_Requirements.zip', content, 'application/zip');
    } catch (err) {
      console.error('Download all failed', err);
      alert('Failed to prepare ZIP: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  function generateComprehensivePDF(requirements, eventDescription) {
    return `VICTORIA EXCURSION PLANNING REQUIREMENTS

Event: ${eventDescription}
Generated: ${new Date().toLocaleString()}

ESTIMATED TIME TO COMPLETE: ${requirements.estimatedTime} minutes

PAPER FORMS TO COMPLETE:
${requirements.paperForms.map(doc => `• ${doc.title} (${doc.filename})`).join('\n')}

ONLINE FORMS TO COMPLETE:
${requirements.onlineForms.map(form => `• ${form.title} - ${form.description}`).join('\n')}

ACTIVITY SUMMARY:
Type: ${requirements.summary.type}
Number of students: ${requirements.summary.students}
Activities: ${requirements.summary.activities}
Transport: ${requirements.summary.transport}
Location: ${requirements.summary.location}
External providers: ${requirements.summary.externalProviders}

RELEVANT POLICY INFORMATION:
• First Aid
• Venue Selection
• Transport
• Adventure Activities
• Communication
• Private Vehicle Use
• Student Medical Information

NEXT STEPS:
1. Download and complete all required paper forms
2. Submit online forms through the appropriate systems
3. Review all policy information
4. Obtain necessary approvals before proceeding with excursion

Victoria Department of Education
Excursion Planning Tool`;
  }
});

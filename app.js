document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('generator-form');
  const downloads = document.getElementById('downloads');
  const fileList = document.getElementById('fileList');
  const backBtn = document.getElementById('backBtn');

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

  function generateExcursionDocuments(formData) {
    const eventDescription = formData.get('eventDescription') || '';
    const type = formData.get('type') || '';
    const duration = formData.get('duration') || '';
    const timeOfDay = formData.get('timeOfDay') || '';
    const students = formData.get('students') || '';
    const activities = formData.getAll('activities');
    const transport = formData.getAll('transport');
    const location = formData.get('location') || '';
    const externalProviders = formData.get('externalProviders') || '';

    const documents = [];

    // Risk Assessment (always required)
    const riskAssessment = generateRiskAssessment(eventDescription, type, duration, activities, transport, location);
    documents.push({
      title: 'Risk Assessment Form',
      filename: 'Risk_Assessment.docx',
      content: riskAssessment,
      description: 'Required for all excursions. Identifies and evaluates potential risks.',
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    // Permission Forms
    const permissionForm = generatePermissionForm(eventDescription, type, duration, timeOfDay, activities, transport);
    documents.push({
      title: 'Student Permission Form',
      filename: 'Permission_Form.pdf',
      content: permissionForm,
      description: 'Required permission slip for parents/guardians to sign.',
      mime: 'application/pdf'
    });

    // Excursion Planning Checklist
    const checklist = generatePlanningChecklist(type, duration, activities, transport, externalProviders);
    documents.push({
      title: 'Excursion Planning Checklist',
      filename: 'Planning_Checklist.pdf',
      content: checklist,
      description: 'Step-by-step checklist to ensure all requirements are met.',
      mime: 'application/pdf'
    });

    // Activity-specific documents
    if (activities.some(act => ['swimming', 'water-based', 'canoeing', 'sailing', 'sea-kayaking'].includes(act))) {
      const waterSafety = generateWaterSafetyPlan();
      documents.push({
        title: 'Water Safety Management Plan',
        filename: 'Water_Safety_Plan.docx',
        content: waterSafety,
        description: 'Required for all water-based activities.',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    }

    if (activities.includes('camping') || type === 'camp' || duration.includes('nights')) {
      const campingPlan = generateCampingPlan();
      documents.push({
        title: 'Camping Safety Plan',
        filename: 'Camping_Plan.docx',
        content: campingPlan,
        description: 'Required for overnight stays and camping activities.',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    }

    if (externalProviders === 'yes-ep') {
      const providerChecklist = generateProviderChecklist();
      documents.push({
        title: 'External Provider Verification',
        filename: 'Provider_Verification.pdf',
        content: providerChecklist,
        description: 'Verification checklist for external activity providers.',
        mime: 'application/pdf'
      });
    }

    if (transport.includes('bus') || transport.includes('private-vehicle')) {
      const transportPlan = generateTransportPlan();
      documents.push({
        title: 'Transport Management Plan',
        filename: 'Transport_Plan.docx',
        content: transportPlan,
        description: 'Required for bus and private vehicle transport.',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    }

    return documents;
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
      alert('Please select at least the excursion type and duration to generate documents.');
      return;
    }

    const documents = generateExcursionDocuments(formData);
    
    fileList.innerHTML = '';

    documents.forEach((doc) => {
      const li = document.createElement('li');
      
      const fileInfo = document.createElement('div');
      fileInfo.className = 'file-info';
      
      const title = document.createElement('div');
      title.className = 'file-title';
      title.textContent = doc.title;
      
      const desc = document.createElement('div');
      desc.className = 'file-desc';
      desc.textContent = doc.description;
      
      fileInfo.appendChild(title);
      fileInfo.appendChild(desc);
      
      const btn = document.createElement('button');
      btn.className = 'primary-btn';
      btn.textContent = 'Download';
      btn.addEventListener('click', () => makeBlobAndDownload(doc.filename, doc.content, doc.mime));
      
      li.appendChild(fileInfo);
      li.appendChild(btn);
      fileList.appendChild(li);
    });

    form.classList.add('hidden');
    downloads.classList.remove('hidden');
  });

  backBtn.addEventListener('click', () => {
    downloads.classList.add('hidden');
    form.classList.remove('hidden');
  });
});

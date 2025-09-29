import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your PocketBase URL

// List of emails
const emails = [
  'pccf.andaman@nic.in',
  'pccf.ap@nic.in',
  'pccf.arunachal@nic.in',
  'pccf.assam@nic.in',
  'pccf.bihar@nic.in',
  'pccf.cg@nic.in',
  'cf.chd@nic.in',
  'pccf.delhi@nic.in',
  'director.ignfa@nic.in',
  'dirfsi@nic.in',
  'pccf.goa@nic.in',
  'pccf.guj@nic.in',
  'pccf.hp@nic.in',
  'pccf.hr@nic.in',
  'dg@icfre.org',
  'director@iifm.ac.in',
  'pccf.jharkhand@nic.in',
  'pccf.jk@nic.in',
  'pccf.kar@nic.in',
  'pccf.kerala@nic.in',
  'cf.lak@nic.in',
  'pccf.mp@nic.in',
  'pccf.mh@nic.in',
  'pccf.manipur@nic.in',
  'pccf.meghalaya@nic.in',
  'pccf.mizoram@nic.in',
  'pccf.nagaland@nic.in',
  'pccf.od@nic.in',
  'pccf.pb@nic.in',
  'pccf.raj@nic.in',
  'pccf.sikkim@nic.in',
  'pccf.tn@nic.in',
  'pccf.telangana@nic.in',
  'pccf.tripura@nic.in',
  'pccf.up@nic.in',
  'pccf.uk@nic.in',
  'pccf.wb@nic.in',
  'dfe@nic.in',
  'dir@wii.gov.in'
];

// Function to extract username from email
function getUsername(email) {
  return email.split('@')[0];
}

// Function to create users
async function createUsers() {
  // Authenticate as admin first
  try {
    await pb.admins.authWithPassword('YOUR_ADMIN_EMAIL', 'YOUR_ADMIN_PASSWORD');
    console.log('Admin authenticated successfully');
  } catch (error) {
    console.error('Admin authentication failed:', error);
    return;
  }

  const results = {
    success: [],
    failed: []
  };

  for (const email of emails) {
    const username = getUsername(email);
    const password = 'changeme';

    try {
      // Create user with verified email
      const user = await pb.collection('users').create({
        username: username,
        email: email,
        password: password,
        passwordConfirm: password,
        emailVisibility: true,
        verified: true
      });

      console.log(`✓ Created user: ${username} (${email})`);
      results.success.push(email);
    } catch (error) {
      console.error(`✗ Failed to create user ${username} (${email}):`, error.message);
      results.failed.push({ email, error: error.message });
    }
  }

  // Print summary
  console.log('\n========== SUMMARY ==========');
  console.log(`Total users: ${emails.length}`);
  console.log(`Successfully created: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed users:');
    results.failed.forEach(item => {
      console.log(`  - ${item.email}: ${item.error}`);
    });
  }
}

// Run the script
createUsers().catch(console.error);

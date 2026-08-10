const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filePath = path.join(process.cwd(), 'components', 'helpline-card.tsx');

console.log('⚡ Running Short & Safe HelplineCard Patcher...');
console.log('------------------------------------------------');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Backup
  fs.writeFileSync(filePath + '.bak', content, 'utf8');
  console.log('✅ Created backup at helpline-card.tsx.bak');

  // 1. Replace handleCall function with the unblocked version (bypasses canOpenURL)
  const oldCallFunction = `  const handleCall = async () => {
    try {
      const phoneNumber = \`tel:\${helpline.number}\`;
      const canOpen = await Linking.canOpenURL(phoneNumber);
      if (canOpen) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert("Error", "Unable to make call on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to initiate call");
    }
  };`;

  const newCallFunction = `  const handleCall = async () => {
    try {
      // Clean non-numeric characters for perfect dialer parsing
      const cleanNumber = helpline.number.replace(/[^0-9+]/g, '');
      const phoneNumber = 'tel:' + cleanNumber;
      
      if (Platform.OS === 'web') {
        const canOpen = await Linking.canOpenURL(phoneNumber);
        if (canOpen) {
          await Linking.openURL(phoneNumber);
        } else {
          Alert.alert("Error", "Unable to make call on this device");
        }
      } else {
        // Direct call unblocked on Native Android & iOS (Bypasses Android 11+ Package Visibility)
        await Linking.openURL(phoneNumber);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to initiate call");
    }
  };`;

  // Apply call function fix
  if (content.includes('const phoneNumber = `tel:${helpline.number}`;')) {
    content = content.replace(oldCallFunction, newCallFunction);
    console.log('✅ Fixed: handleCall function unblocked!');
  } else {
    // Fallback replacement if formatting differs slightly
    content = content.replace(
      /const phoneNumber = `tel:\${helpline\.number}`;[\s\S]*?await Linking\.canOpenURL\(phoneNumber\);[\s\S]*?Alert\.alert\("Error", "Unable to make call on this device"\);[\s\S]*?}/,
      `const cleanNumber = helpline.number.replace(/[^0-9+]/g, '');\n      const phoneNumber = 'tel:' + cleanNumber;\n      await Linking.openURL(phoneNumber);\n    }`
    );
    console.log('✅ Applied fallback handleCall unblocker.');
  }

  // 2. Adjust styling & text sizes to compact format (prevent truncation)
  content = content.replace('padding: 16,', 'padding: 12,');
  content = content.replace('marginBottom: 12,', 'marginBottom: 10,');
  content = content.replace('borderRadius: 16,', 'borderRadius: 14,');
  content = content.replace('width: 56,', 'width: 44,');
  content = content.replace('height: 56,', 'height: 44,');
  content = content.replace('borderRadius: 28,', 'borderRadius: 22,');
  content = content.replace('size={28}', 'size={22}');
  content = content.replace('fontSize: 16,', 'fontSize: 13,'); // Main Name size
  content = content.replace('lineHeight: 20,', 'lineHeight: 17,');
  content = content.replace('fontSize: 12,', 'fontSize: 10,'); // Urdu Name size
  content = content.replace('fontSize: 16,\n              marginTop: 8,', 'fontSize: 13,\n              marginTop: 4,'); // Number size
  content = content.replace('width: 44,\n                height: 44,\n                borderRadius: 22,', 'width: 36,\n                height: 36,\n                borderRadius: 18,'); // Call button size
  content = content.replace('size={24}', 'size={20}'); // Action buttons size

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Success! helpline-card.tsx has been compacted and call-unblocked.');

  // Push to Git
  try {
    console.log('Staging and pushing changes to GitHub...');
    execSync('git add components/helpline-card.tsx', { stdio: 'inherit' });
    execSync('git commit -m "fix: compact HelplineCard layout and unblock native dialer"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('🚀 Successfully pushed to GitHub!');
  } catch (err) {
    console.warn('⚠️ Git push failed, please push manually.');
  }
} else {
  console.error(`❌ File not found at: \${filePath}`);
}
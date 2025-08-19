#!/usr/bin/env node

/**
 * 部署前檢查腳本
 * 確保專案準備好部署到 Vercel
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 開始部署前檢查...\n');

const checks = [
  {
    name: '檢查必要文件',
    check: () => {
      const requiredFiles = [
        'package.json',
        'next.config.ts',
        'vercel.json',
        'src/app/layout.tsx',
        'src/app/page.tsx',
      ];
      
      const missing = requiredFiles.filter(file => !fs.existsSync(file));
      
      if (missing.length > 0) {
        throw new Error(`缺少必要文件: ${missing.join(', ')}`);
      }
      
      return '✅ 所有必要文件都存在';
    }
  },
  
  {
    name: '檢查 package.json',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      if (!pkg.scripts.build) {
        throw new Error('缺少 build 腳本');
      }
      
      if (!pkg.scripts.start) {
        throw new Error('缺少 start 腳本');
      }
      
      const requiredDeps = ['next', 'react', 'react-dom'];
      const missing = requiredDeps.filter(dep => !pkg.dependencies[dep]);
      
      if (missing.length > 0) {
        throw new Error(`缺少必要依賴: ${missing.join(', ')}`);
      }
      
      return '✅ package.json 配置正確';
    }
  },
  
  {
    name: '檢查 TypeScript 配置',
    check: () => {
      try {
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        return '✅ TypeScript 類型檢查通過';
      } catch (error) {
        throw new Error('TypeScript 類型檢查失敗');
      }
    }
  },
  
  {
    name: '檢查 ESLint',
    check: () => {
      try {
        execSync('npm run lint', { stdio: 'pipe' });
        return '✅ ESLint 檢查通過';
      } catch (error) {
        throw new Error('ESLint 檢查失敗，請修復代碼問題');
      }
    }
  },
  
  {
    name: '檢查代碼格式',
    check: () => {
      try {
        execSync('npm run format:check', { stdio: 'pipe' });
        return '✅ 代碼格式檢查通過';
      } catch (error) {
        throw new Error('代碼格式不正確，請運行 npm run format');
      }
    }
  },
  
  {
    name: '測試建置',
    check: () => {
      try {
        console.log('   正在測試建置...');
        execSync('npm run build', { stdio: 'pipe' });
        
        // 檢查建置輸出
        if (!fs.existsSync('.next')) {
          throw new Error('建置失敗 - 找不到 .next 目錄');
        }
        
        return '✅ 建置測試通過';
      } catch (error) {
        throw new Error('建置失敗');
      }
    }
  },
  
  {
    name: '檢查環境變數範例',
    check: () => {
      if (!fs.existsSync('.env.example')) {
        throw new Error('缺少 .env.example 文件');
      }
      
      return '✅ 環境變數範例文件存在';
    }
  },
  
  {
    name: '檢查 Vercel 配置',
    check: () => {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      if (!vercelConfig.version) {
        throw new Error('vercel.json 缺少 version 字段');
      }
      
      if (!vercelConfig.builds) {
        throw new Error('vercel.json 缺少 builds 配置');
      }
      
      return '✅ Vercel 配置正確';
    }
  }
];

let passed = 0;
let failed = 0;

for (const { name, check } of checks) {
  try {
    const result = check();
    console.log(`${result}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failed++;
  }
}

console.log(`\n📊 檢查結果: ${passed} 通過, ${failed} 失敗`);

if (failed > 0) {
  console.log('\n❌ 部署前檢查失敗，請修復上述問題後再次嘗試');
  process.exit(1);
} else {
  console.log('\n🎉 所有檢查通過！專案已準備好部署到 Vercel');
  
  console.log('\n📋 部署步驟:');
  console.log('1. 確保代碼已推送到 GitHub');
  console.log('2. 在 Vercel Dashboard 中導入專案');
  console.log('3. 設定環境變數 (參考 .env.example)');
  console.log('4. 點擊部署');
  
  console.log('\n🔗 有用的連結:');
  console.log('- Vercel Dashboard: https://vercel.com/dashboard');
  console.log('- 部署文檔: ./DEPLOYMENT.md');
}
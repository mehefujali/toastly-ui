<div align="center">
  <h1>Toastly UI</h1>
  <p>
    A fully customizable, lightweight, and production-ready toast notification library for React application.
    Designed for simplicity and performance with modern design systems in mind.
  </p>
  
  <!-- Badges -->
  <p>
    <a href="https://toastly-ui.vercel.app/">
      <img src="https://img.shields.io/website?url=https%3A%2F%2Ftoastly-ui.vercel.app%2F&up_message=Live%20Demo&up_color=success&style=flat-square" alt="Live Demo" />
    </a>
    <a href="https://www.npmjs.com/package/toastly-ui">
      <img src="https://img.shields.io/npm/v/toastly-ui?style=flat-square&color=blue" alt="NPM Version" />
    </a>
    <a href="https://www.npmjs.com/package/toastly-ui">
      <img src="https://img.shields.io/bundlephobia/minzip/toastly-ui?style=flat-square&color=green" alt="Size" />
    </a>
    <a href="https://github.com/mehefujali/toastly-ui/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/toastly-ui?style=flat-square&color=grey" alt="License" />
    </a>
  </p>

  <!-- Quick Links -->
  <h3>
    <a href="https://toastly-ui.vercel.app/">✨ View Live Demo</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://www.npmjs.com/package/toastly-ui">📦 View on NPM</a>
  </h3>
</div>

<hr />

<h2>Table of Contents</h2>

<ul>
  <li><a href="#introduction">Introduction</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#usage">Usage</a>
    <ul>
      <li><a href="#basic-toasts">Basic Toasts</a></li>
      <li><a href="#promise-handling">Promise Handling</a></li>
      <li><a href="#custom-component">Custom Component</a></li>
    </ul>
  </li>
  <li><a href="#api-reference">API Reference</a></li>
  <li><a href="#styling">Styling & Customization</a></li>
  <li><a href="#license">License</a></li>
</ul>

<h2 id="introduction">Introduction</h2>

<p>
Toastly UI creates a seamless notification experience for your users. Unlike other libraries that feel heavy or complex, Toastly UI focuses on providing a clean API with beautiful "Glassmorphism" aesthetics out of the box. It uses a centralized store observer pattern, meaning you can trigger toasts from anywhere in your application without context wrapping hell.
</p>

<h2 id="features">Features</h2>

<ul>
  <li><strong>Lightweight:</strong> Less than 5kb gzipped. Zero external UI dependencies.</li>
  <li><strong>Headless-ish:</strong> Full control over styling using CSS variables or custom classes.</li>
  <li><strong>Smart Positioning:</strong> Supports 6 different screen positions (Top/Bottom - Left/Center/Right).</li>
  <li><strong>Promise Support:</strong> Native support for handling asynchronous operations (Loading -> Success/Error).</li>
  <li><strong>Multiple Variants:</strong> Includes Modern, Minimalist, Enterprise, and Glass styles.</li>
  <li><strong>Accessible:</strong> WAI-ARIA compliant for screen readers.</li>
  <li><strong>TypeScript:</strong> Written in TypeScript with complete type definitions included.</li>
</ul>

<h2 id="installation">Installation</h2>

<p>Install the package via your preferred package manager:</p>

<pre><code>npm install toastly-ui</code></pre>

<p>Or using Yarn:</p>

<pre><code>yarn add toastly-ui</code></pre>

<h2 id="getting-started">Getting Started</h2>

<p>To start using Toastly UI, you need to add the <code>Toaster</code> component to the root of your application. This component acts as the container for all your notifications.</p>

<h3>1. Import the Component and Styles</h3>

<p>In your root file (e.g., <code>App.tsx</code>, <code>layout.tsx</code>, or <code>main.tsx</code>):</p>

<pre><code class="language-tsx">import { Toaster } from 'toastly-ui';
import 'toastly-ui/dist/toastly.css'; // Essential for styling

export default function App() {
  return (
    &lt;&gt;
      {/* Your application components */}
      &lt;Toaster position="top-right" /&gt;
    &lt;/&gt;
  );
}</code></pre>

<h2 id="usage">Usage</h2>

<p>You can trigger notifications from anywhere in your app using the <code>toast</code> object.</p>

<h3 id="basic-toasts">Basic Toasts</h3>

<pre><code class="language-tsx">import { toast } from 'toastly-ui';

// Success message
toast.success('Your changes have been saved.');

// Error message
toast.error('Unable to connect to the server.');

// Info message
toast.info('New update available.');

// Custom options
toast.success('Profile Updated', {
  duration: 5000,
  position: 'bottom-center',
  variant: 'glass'
});</code></pre>

<h3 id="promise-handling">Promise Handling</h3>

<p>The <code>toast.promise</code> function automatically handles the loading state and updates the toast to success or error based on the promise resolution.</p>

<pre><code class="language-tsx">const handleSave = async () => {
  const myPromise = saveDataToDatabase();

  toast.promise(myPromise, {
    loading: 'Saving data...',
    success: 'Data saved successfully!',
    error: 'Could not save data.'
  });
};</code></pre>

<p>You can also use functions to generate dynamic messages based on the response:</p>

<pre><code class="language-tsx">toast.promise(fetchUser(), {
  loading: 'Loading user...',
  success: (data) => `Welcome back, ${data.name}!`,
  error: (err) => `Login failed: ${err.message}`
});</code></pre>

<h2 id="api-reference">API Reference</h2>

<h3>Toaster Props</h3>

<p>The <code>&lt;Toaster /&gt;</code> component accepts the following props:</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>position</code></td>
      <td><code>string</code></td>
      <td><code>'top-right'</code></td>
      <td>Where the toasts appear. Options: <code>top-left</code>, <code>top-right</code>, <code>top-center</code>, <code>bottom-left</code>, <code>bottom-right</code>, <code>bottom-center</code>.</td>
    </tr>
    <tr>
      <td><code>toastOptions</code></td>
      <td><code>object</code></td>
      <td><code>{}</code></td>
      <td>Default options applied to all toasts (e.g., variant, style, className).</td>
    </tr>
  </tbody>
</table>

<h3>Toast Options</h3>

<p>These options can be passed to any <code>toast()</code> call:</p>

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>duration</code></td>
      <td><code>number</code></td>
      <td>Time in milliseconds before auto-dismiss. Default is 3000ms.</td>
    </tr>
    <tr>
      <td><code>variant</code></td>
      <td><code>string</code></td>
      <td>Visual style. Options: <code>modern</code>, <code>minimalist</code>, <code>enterprise</code>, <code>glass</code>.</td>
    </tr>
    <tr>
      <td><code>icon</code></td>
      <td><code>ReactNode</code></td>
      <td>Custom icon to replace the default status icon.</td>
    </tr>
    <tr>
      <td><code>style</code></td>
      <td><code>CSSProperties</code></td>
      <td>Inline styles for the individual toast.</td>
    </tr>
    <tr>
      <td><code>className</code></td>
      <td><code>string</code></td>
      <td>Custom CSS class for the individual toast.</td>
    </tr>
  </tbody>
</table>

<h2 id="styling">Styling & Customization</h2>

<p>Toastly UI uses CSS variables, making it easy to override styles to match your brand without fighting with specificity.</p>

<pre><code class="language-css">:root {
  --toastly-font: 'Inter', sans-serif;
  --toastly-z-index: 5000;
}

/* Example: Override the Modern Variant */
.toastly-variant-modern {
  background-color: #fafafa;
  border-radius: 12px;
}</code></pre>

<h2 id="license">License</h2>

<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<div align="center">
  <p>
    Created with ❤️ by <a href="https://mehefujali.com">Mehefuj Ali</a>
  </p>
</div>
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@components": resolve(dirname(fileURLToPath(import.meta.url)), "src/components"),
			"@utilities": resolve(dirname(fileURLToPath(import.meta.url)), "src/utilities"),
			"@constants": resolve(dirname(fileURLToPath(import.meta.url)), "src/constants"),
			"@store": resolve(dirname(fileURLToPath(import.meta.url)), "src/store"),
			"@windows": resolve(dirname(fileURLToPath(import.meta.url)), "src/windows"),
		},
	},
	build: {
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("gsap")) {
							return "vendor_gsap";
						}
						if (id.includes("lucide-react")) {
							return "vendor_lucide";
						}
						if (id.includes("react-pdf") || id.includes("pdfjs-dist")) {
							return "vendor-pdf";
						}
						if (id.includes("react-zoom-pan-pinch")) {
							return "vendor-zoom";
						}
						return "vendor";
					}
				},
			},
		},
	},
});

---
name: create-app-shortcut
description: >
  Creates desktop shortcuts (.desktop files) for Linux applications, including AppImage, binary, and script-based apps.
  Use this skill whenever the user wants to create a launcher, shortcut, or desktop entry for an application on Linux.
  Also use when the user says "create shortcut", "make launcher", "add to menu", "desktop entry", ".desktop file",
  "create app shortcut", or mentions wanting to launch an app from the application menu.
  Works with XFCE, GNOME, KDE, and other desktop environments following the FreeDesktop specification.
---

# Create App Shortcut

This skill creates `.desktop` files for Linux applications following the FreeDesktop Desktop Entry Specification.

## Workflow

### 1. Gather information

Determine:
- **Application path**: Full path to the executable, AppImage, or script
- **Application name**: Display name (e.g., "Warp")
- **Application description**: Short comment for the launcher
- **Icon**: URL to download or local path to an image file
- **Categories**: Appropriate FreeDesktop categories (see below)
- **Terminal app**: Whether the app runs in a terminal (`Terminal=true`) or has its own GUI (`Terminal=false`)

If any of this is unknown, research it:
- For known apps: search the web for official info, logos, and descriptions
- For AppImages: run `<path> --version` or `<path> --help` to identify the app
- For icons: search the app's official website, GitHub repo, or press kit for a PNG/SVG logo (512x512 preferred)

### 2. Download the icon

Save the icon to `~/pictures/app-logo/<app-name>.png` (or `.svg`):

```bash
mkdir -p ~/pictures/app-logo
curl -L -o ~/pictures/app-logo/<app-name>.png "<icon-url>"
```

Verify it's a valid image:

```bash
file ~/pictures/app-logo/<app-name>.png
```

If the downloaded file is not an image (e.g., HTML), find a different URL.

### 3. Create the .desktop file

Write to `~/.local/share/applications/<app-name-lowercase>.desktop`:

```ini
[Desktop Entry]
Name=<Application Name>
Comment=<Short description>
Exec=<full-path-to-executable>
Icon=<full-path-to-icon>
Terminal=<true|false>
Type=Application
Categories=<Category1>;
StartupWMClass=<WMClass-if-known>
Keywords=<keyword1>;<keyword2>;
```

**Categories guidance** - pick ONE main category to avoid duplicate menu entries:
- Development tools: `Development;`
- System utilities: `Utility;` or `System;`
- Games: `Game;`
- Office: `Office;`
- Graphics: `Graphics;`
- Network/Web: `Network;`
- Audio/Video: `AudioVideo;`

Avoid combining multiple main categories (e.g., `Development;System;`) - this causes the app to appear in multiple menu sections.

**StartupWMClass**: If known, set this to help the desktop environment match running windows to the launcher. For unknown apps, omit it or set it to the app name.

### 4. Set permissions and validate

```bash
chmod +x ~/.local/share/applications/<app-name-lowercase>.desktop
desktop-file-validate ~/.local/share/applications/<app-name-lowercase>.desktop
```

Fix any errors or warnings from the validator. Hints about multiple main categories should be resolved by keeping only one.

### 5. Verify the application launches

Test that the executable works:

```bash
# For AppImage or binary
timeout 5 <path-to-app> --version 2>&1 || true

# Or check help output
<path-to-app> --help 2>&1 | head -20
```

If the app has no `--version` or `--help`, verify the file is executable and the path is correct:

```bash
file <path-to-app>
ls -la <path-to-app>
```

### 6. Refresh the desktop database (if needed)

```bash
update-desktop-database ~/.local/share/applications/
```

## Example: Warp AppImage

Input: AppImage at `~/soft/Warp-x86_64.AppImage`, app is "Warp" from warp.dev

Result:
```ini
[Desktop Entry]
Name=Warp
Comment=The Agentic Development Environment
Exec=/home/andrew/soft/Warp-x86_64.AppImage
Icon=/home/andrew/pictures/app-logo/warp.png
Terminal=false
Type=Application
Categories=Development;
StartupWMClass=Warp
Keywords=terminal;shell;agent;
```

## Notes

- Always use absolute paths in `Exec` and `Icon` fields
- For AppImage files, ensure they have the executable bit set (`chmod +x`)
- Icon files should be PNG or SVG, ideally 512x512 or larger
- The `.desktop` file itself should be executable for some desktop environments
- If the user wants the shortcut on the desktop, copy the file to `~/Desktop/`

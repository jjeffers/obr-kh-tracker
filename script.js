const { usePlugin, core, events } = window.owr;

const plugin = usePlugin();

function updateInputsFromMetadata(metadata = {}) {
  document.getElementById('hpInput').value = metadata.hp ?? '';
  document.getElementById('adfInput').value = metadata.adf ?? '';
  document.getElementById('mrInput').value = metadata.mr ?? '';
  document.getElementById('speedInput').value = metadata.speed ?? '';
  document.getElementById('dcrInput').value = metadata.dcr ?? '';

  document.getElementById('weaponsInput').value = metadata.weapons ?? '';
  document.getElementById('defensesInput').value = metadata.defenses ?? '';
  document.getElementById('damagedSystemsInput').value = metadata.damagedSystems ?? '';
}

plugin.ready().then(() => {
  plugin.events.on(events.SELECTED_TOKENS_CHANGE, async () => {
    const tokens = plugin.canvas.getSelectedTokens();
    if (tokens.length === 1) {
      const metadata = plugin.metadata.getTokenMetadata(tokens[0].id);
      updateInputsFromMetadata(metadata?.customStats || {});
    } else {
      updateInputsFromMetadata({});
    }
  });

  document.getElementById('saveBtn').addEventListener('click', () => {
    const tokens = plugin.canvas.getSelectedTokens();
    if (tokens.length === 1) {
      const tokenId = tokens[0].id;

      const newStats = {
        hp: parseInt(document.getElementById('hpInput').value) || 0,
        adf: parseInt(document.getElementById('adfInput').value) || 0,
        mr: parseInt(document.getElementById('mrInput').value) || 0,
        speed: parseInt(document.getElementById('speedInput').value) || 0,
        dcr: parseInt(document.getElementById('dcrInput').value) || 0,
        weapons: document.getElementById('weaponsInput').value.trim(),
        defenses: document.getElementById('defensesInput').value.trim(),
        damagedSystems: document.getElementById('damagedSystemsInput').value.trim(),
      };

      plugin.metadata.updateTokenMetadata(tokenId, {
        customStats: newStats
      });
    }
  });
});

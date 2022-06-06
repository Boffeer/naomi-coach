# Bayan.JS

## How to make only one Bayan Opened at the same time?

Just add to your bayans contianer class `bayan__wrap--single`

```html
<div class="some-wrap bayan__wrap--single">
  <div class="bayan">
    <div class="some-class-of-the-bayan-top-content">I'm top</div>
    <div class="some-class-of-the-bayan-bottom-content">I'm bottom</div>
  </div>
</div>
```

---

`data-bayan="absolute"` makes bottom part absolute positioned

## If you wanna close Bayan on mouseout

```html
<div class="some-wrap bayan__wrap--hover">
  <div class="bayan bayan--desktop-hover">
    <div class="some-class-of-the-bayan-top-content">I'm top</div>
    <div class="some-class-of-the-bayan-bottom-content">I'm bottom</div>
  </div>
</div>
```

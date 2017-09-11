function noPostBack(buttonName, evt)
{
  if (window.event)
  {
    skeyCode = event.keyCode;
  }
  else
  {
    skeyCode = evt.which;
  }

  if (skeyCode == 13)
  {
    if (buttonName == "Imagebutton2")
    {
      searchSubmit('Imagebutton2', evt);
    }
    else if (buttonName == "mobile_Imagebutton2")
    {
      searchSubmit('mobile_Imagebutton2', evt);
    }

    return false;
  }
}

function searchSubmit(buttonName, evt)
{
  if (((document.forms[0].s_Text != undefined) && (document.forms[0].s_Text.value != "")) || ((document.forms[0].Text1 != undefined) && (document.forms[0].Text1.value != "")))
  {
    var searchURL = document.forms[0].s_URL.value;
    var spA = document.forms[0].sp_a.value;
    var spP = document.forms[0].sp_p.value;
    var spT = document.forms[0].sp_t.value;
    var spQ;

    if (buttonName == "Imagebutton2")
    {
      spQ = document.forms[0].sp_q.value;
    }
    else if (buttonName == "mobile_Imagebutton2")
    {
      spQ = document.forms[0].mobile_sp_q.value;
    }

    document.forms[0].action = searchURL + "?q=" + spQ;
    document.location.href = searchURL + "?q=" + spQ;

    document.forms[0].submit;

    return true;
  }

  return false;
}

function searchBoxMouseOver(box, image)
{
  if (typeof box.nextSibling != 'undefined')
  {
    box.nextSibling.src = image;
  }
  else
  {
    box.nextSibling.nextSibling.src = image;
  }
}

function searchBoxMouseOut(box, image)
{
  if (typeof box.nextSibling != 'undefined')
  {
    box.nextSibling.src = image;
  }
  else
  {
    box.nextSibling.nextSibling.src = image;
  }
}